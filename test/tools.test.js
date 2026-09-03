const test = require("node:test");
const assert = require("node:assert/strict");
const { tools, getTool, navigateToTool, isSafeWebUrl } = require("../src/tools");

test("tool configuration contains exactly the five required tools", () => {
  assert.deepEqual(
    tools.map(({ label, url }) => ({ label, url })),
    [
      { label: "Slack", url: "https://team3786.slack.com/" },
      { label: "Jira", url: "https://chargerrobotics.atlassian.net/jira" },
      { label: "Confluence", url: "https://chargerrobotics.atlassian.net/wiki/spaces" },
      { label: "OnShape", url: "https://cad.onshape.com/" },
      { label: "Team Site", url: "https://www.chargerrobotics.com/" }
    ]
  );
});

test("tool configuration and entries cannot be modified", () => {
  assert.equal(Object.isFrozen(tools), true);
  assert.equal(Object.isFrozen(tools[0]), true);
});

test("getTool finds configured tools and rejects unknown IDs", () => {
  assert.equal(getTool("jira").label, "Jira");
  assert.equal(getTool("unknown"), undefined);
});

test("navigateToTool loads the configured URL", () => {
  const loadedUrls = [];
  const browser = { loadURL: (url) => loadedUrls.push(url) };

  const tool = navigateToTool(browser, "onshape");

  assert.equal(tool.label, "OnShape");
  assert.deepEqual(loadedUrls, ["https://cad.onshape.com/"]);
});

test("navigateToTool does not navigate for unknown tools", () => {
  const browser = { loadURL: () => assert.fail("unexpected navigation") };
  assert.throws(() => navigateToTool(browser, "unknown"), /Unknown tool: unknown/);
});

test("URL handling allows HTTPS and rejects unsafe or invalid URLs", () => {
  assert.equal(isSafeWebUrl("https://example.com/path"), true);
  assert.equal(isSafeWebUrl("http://example.com"), false);
  assert.equal(isSafeWebUrl("javascript:alert(1)"), false);
  assert.equal(isSafeWebUrl("not a URL"), false);
});
