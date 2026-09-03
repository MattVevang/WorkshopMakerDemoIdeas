const { tools, navigateToTool } = globalThis.ChargerTools;
const browser = document.querySelector("#browser");
const navigation = document.querySelector("#tool-nav");

function setActiveTool(id) {
  navigation.querySelectorAll("button").forEach((button) => {
    const active = button.dataset.toolId === id;
    button.classList.toggle("active", active);
    button.setAttribute("aria-current", active ? "page" : "false");
  });
}

tools.forEach((tool, index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = tool.label;
  button.dataset.toolId = tool.id;
  button.addEventListener("click", () => {
    navigateToTool(browser, tool.id);
    setActiveTool(tool.id);
  });
  navigation.append(button);

  if (index === 0) {
    button.classList.add("active");
    button.setAttribute("aria-current", "page");
  }
});
