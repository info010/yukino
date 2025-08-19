import { yukino } from "yukino-ts";

const logger = yukino.logger(yukino.LogLevel.INFO, [
  yukino.filetransport("examples/logs/sync.log", yukino.prettyformatter()),
  yukino.asyncfiletransport("examples/logs/async.json", yukino.jsonformatter()),
]);

logger.info("Sync file log example");
logger.warn("Sync file log with context", { user: "tester" });

(async () => {
  logger.info("Async file log example");
  logger.error("Async file log with context", { retry: true });
})();
