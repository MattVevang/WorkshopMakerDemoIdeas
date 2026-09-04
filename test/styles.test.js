const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const styles = fs.readFileSync(path.join(__dirname, "..", "styles.css"), "utf8");

test("embedded app fills the available content area", () => {
  assert.match(styles, /main\s*{[^}]*display:\s*flex;/s);
  assert.match(styles, /webview\s*{[^}]*flex:\s*1;/s);
});
