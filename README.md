# Charger Robotics Launcher

A Windows desktop launcher for Charger Robotics (FRC Team 3786). The persistent toolbar
opens Slack, Jira, Confluence, OnShape, and the team website in an embedded Chromium
browser. Electron stores browser sessions locally so tool logins persist between launches.

## Development

Requires Node.js 24 or later.

```sh
npm ci
npm test
npm start
```

## Windows installer

Build the NSIS installer on Windows:

```sh
npm run build:win
```

Pushes to `main` automatically test and package the application on GitHub Actions, upload
the installer as a workflow artifact, and publish it on a uniquely tagged GitHub Release.