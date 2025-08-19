import { yukino } from "../src/yukino";

const logger = yukino.logger(yukino.LogLevel.DEBUG, [
  yukino.asyncconsoletransport(yukino.prettyformatter(), 0),
  yukino.asyncfiletransport("examples/logs/async.json", yukino.jsonformatter()),
]);

(async () => {
  logger.info("Server started", { port: 3000 });
  logger.warn("Low disk space warning");
  logger.error("Database connection failed", { retry: true });
})();
