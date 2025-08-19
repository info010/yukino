import { yukino } from "../src/yukino";

const logger = yukino.logger(yukino.LogLevel.INFO, [
  yukino.filetransport("exampleslogs/sync.log", yukino.prettyformatter()),
  yukino.asyncfiletransport("exampleslogs/async.json", yukino.jsonformatter()),
]);

logger.info("Sync file log example");
logger.warn("Sync file log with context", { user: "tester" });

(async () => {
  logger.info("Async file log example");
  logger.error("Async file log with context", { retry: true });
})();
