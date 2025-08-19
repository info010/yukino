# Yukino Logger

A lightweight, flexible, and extendable logging library for Node.js, written in TypeScript.  
Supports multiple log levels, synchronous/asynchronous transports, context-aware logging, and custom formatters.

---

## Features

- **Log Levels:** FATAL, ERROR, WARN, INFO, DEBUG, TRACE
- **Transports:**
  - ConsoleTransport (sync)
  - AsyncConsoleTransport
  - FileTransport (sync)
  - AsyncFileTransport
- **Formatters:**
  - PrettyFormatter (human-readable, colorized)
  - JsonFormatter (structured JSON)
  - Extendable for custom formats
- **Context Management:**
  - Supports requestId, userId, sessionId, traceId, and custom keys
- **Safe Execution:**
  - Wrap logging calls to avoid breaking application if a transport fails
- Fully TypeScript typed
- Async logging support for files or remote services
- Structured JSON output for log aggregation tools

---

## Installation

```bash
pnpm add yukino
# or
npm install yukino
```

## Usage

### Basic Logger

```typescript
import { yukino } from "yukino";

const logger = yukino.logger(yukino.LogLevel.DEBUG, [
  yukino.consoletransport(yukino.prettyformatter()),
]);

logger.info("Server started", { port: 3000 });
logger.error("Database connection failed", { retry: true });
logger.warn("Low memory warning");
logger.debug("Debugging details");
logger.fatal("Fatal error, shutting down");
```

### Context-Aware Logging

```typescript
const requestLogger = logger.withContext({
  requestId: "abc123",
  userId: "user42",
});

requestLogger.info("User request started");
requestLogger.error("User request failed", { endpoint: "/api/data" });
```

### File Logging

```typescript
import { yukino } from "yukino";

const syncFileLogger = yukino.logger(yukino.LogLevel.INFO, [
  yukino.filetransport("./logs/app.log", yukino.prettyformatter()),
]);

const asyncFileLogger = yukino.logger(yukino.LogLevel.INFO, [
  yukino.asyncfiletransport("./logs/app_async.log", yukino.prettyformatter()),
]);

syncFileLogger.info("Sync file log example");
asyncFileLogger.info("Async file log example");
```

### JSON Logging

```typescript
import { yukino } from "yukino";

const jsonLogger = yukino.logger(yukino.LogLevel.DEBUG, [
  yukino.asyncfiletransport("./logs/app.json", yukino.jsonformatter()),
]);

jsonLogger.debug("Structured JSON log", { sessionId: "sess123" });
```

### Advanced Usage

Custom Formatter: Implement the `Formatter` interface to create your own log format.

Custom Transport: Extend `SyncTransporter` or `AsyncTransporter` to create transports (e.g., database, remote API).

Safe Execution: Use `safeExecute` to avoid breaking your app if a transport fails.

```typescript
import { yukino } from "yukino";

yukino.safeExecute(() => logger.info("This log is safe"), undefined);
```

## Log Levels

| Level | Value | Description                    |
| ----- | ----- | ------------------------------ |
| FATAL | 0     | Critical errors, shutting down |
| ERROR | 1     | Recoverable errors             |
| WARN  | 2     | Warnings                       |
| INFO  | 3     | Informational messages         |
| DEBUG | 4     | Debug-level messages           |
| TRACE | 5     | Detailed tracing info          |

## Contributing

We welcome contributions to this project! If you would like to contribute, please follow these guidelines:

1. **Fork this repository:** Create a personal fork of the repository on GitHub.
2. **Clone the fork:** Clone the fork to your local machine and add the upstream repository as a remote.
   ```bash
   git clone https://github.com/info10/yukino.git
   ```
3. Create a branch: Create a new branch for your changes.
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. Make your changes: Implement your changes in the new branch.
5. Commit your changes: Commit your changes with a descriptive commit message.
   ```bash
   git commit -m "Description of your changes"
   ```
6. Push to your fork: Push your changes to your forked repository.
   ```bash
   git push origin feature/your-feature-name
   ```
7. Create a Pull Request: Open a pull request from your branch to the main repository's main branch. Provide a clear description of your changes and any relevant information.
