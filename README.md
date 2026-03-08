# WebSocket Tester

A lightweight, browser-based WebSocket testing tool for local development. No dependencies required.

![WebSocket Tester UI](https://github.com/user-attachments/assets/placeholder)

## Features

- **Connection management** — Connect/disconnect with custom URL, optional headers panel (memo use)
- **Message log** — Color-coded sent / received / system messages with millisecond timestamps
- **JSON support** — Auto-detect and syntax-highlight JSON, one-click formatting
- **Message templates** — Save frequently used messages and reload them with one click
- **Auto send** — Automatically send messages at a configurable interval (useful for ping or load testing)
- **Connection history** — Recently used URLs saved automatically
- **Live reload** — Changes to `index.html` are reflected in the browser instantly (both Docker and Node.js)
- **Dark / Light mode** — Toggle with one click, preference is persisted
- **Keyboard shortcuts** — `Ctrl+Enter` to send, `Enter` to connect

## Getting Started

### Option 1 — Docker (recommended)

```bash
docker compose up -d
```

Open [http://localhost:7070](http://localhost:7070) in your browser.

The container restarts automatically after system reboot (requires Docker Desktop set to start on login).

To stop:

```bash
docker compose down
```

### Option 2 — Node.js

**Requirements:** Node.js 14+

```bash
node server.js
```

Open [http://localhost:7070](http://localhost:7070) in your browser.

Saving `public/index.html` automatically reloads the browser via Server-Sent Events.

## Usage

### Connect

1. Enter a WebSocket URL (e.g. `ws://localhost:8080/ws`) in the input field
2. Click **Connect** or press `Enter`
3. The status indicator shows the current state: `CONNECTING` → `OPEN` → `CLOSED`

### Send a Message

1. Type a message in the composer area
2. Click **Send** or press `Ctrl+Enter`
3. Select **JSON** from the type selector to send JSON, or click **Format JSON** to pretty-print first

### Save a Template

1. Write a message in the composer
2. Click **Save** and enter a name
3. The template appears in the left sidebar — click it to load, `×` to delete

### Auto Send

1. Check **Auto Send** in the bar above the composer
2. Set the interval in milliseconds (minimum 100ms)
3. The current message is sent repeatedly until you uncheck **Auto Send** or disconnect

## Project Structure

```text
websocket-tester/
├── public/
│   └── index.html      # Single-file frontend (HTML + CSS + JS)
├── server.js           # HTTP server with live reload via SSE
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## Notes

- **Custom headers** — Browsers do not support custom headers in the native WebSocket API. The headers panel is provided for documentation/reference purposes only.
- **Live reload** — `public/index.html` is mounted as a volume in Docker, so edits on the host are picked up automatically in both Docker and Node.js modes.

## License

MIT
