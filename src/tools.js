(function exposeTools(root) {
  const tools = Object.freeze([
    Object.freeze({ id: "slack", label: "Slack", url: "https://team3786.slack.com/" }),
    Object.freeze({ id: "jira", label: "Jira", url: "https://chargerrobotics.atlassian.net/jira" }),
    Object.freeze({ id: "confluence", label: "Confluence", url: "https://chargerrobotics.atlassian.net/wiki/spaces" }),
    Object.freeze({ id: "onshape", label: "OnShape", url: "https://cad.onshape.com/" }),
    Object.freeze({ id: "team-site", label: "Team Site", url: "https://www.chargerrobotics.com/" })
  ]);

  function getTool(id) {
    return tools.find((tool) => tool.id === id);
  }

  function navigateToTool(browser, id) {
    const tool = getTool(id);
    if (!tool) {
      throw new Error(`Unknown tool: ${id}`);
    }

    browser.loadURL(tool.url);
    return tool;
  }

  function isSafeWebUrl(value) {
    try {
      return new URL(value).protocol === "https:";
    } catch {
      return false;
    }
  }

  const api = Object.freeze({ tools, getTool, navigateToTool, isSafeWebUrl });

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  } else {
    root.ChargerTools = api;
  }
})(globalThis);
