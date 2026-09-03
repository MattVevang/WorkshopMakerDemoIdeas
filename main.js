const path = require("node:path");
const { app, BrowserWindow } = require("electron");
const { isSafeWebUrl } = require("./src/tools");

const createWindow = () => {
  const window = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 760,
    minHeight: 560,
    title: "Charger Robotics Launcher",
    backgroundColor: "#0B341A",
    icon: path.join(__dirname, "assets", "icon.png"),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webviewTag: true
    }
  });

  window.webContents.on("will-attach-webview", (event, webPreferences, params) => {
    delete webPreferences.preload;
    webPreferences.nodeIntegration = false;
    webPreferences.contextIsolation = true;
    webPreferences.sandbox = true;

    if (!isSafeWebUrl(params.src)) {
      event.preventDefault();
    }
  });

  window.webContents.on("did-attach-webview", (_event, guestContents) => {
    guestContents.setWindowOpenHandler(({ url }) => {
      if (!isSafeWebUrl(url)) {
        return { action: "deny" };
      }

      return {
        action: "allow",
        overrideBrowserWindowOptions: {
          autoHideMenuBar: true,
          webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true
          }
        }
      };
    });
  });

  window.setMenuBarVisibility(false);
  window.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
