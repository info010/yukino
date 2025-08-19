import { yukino } from "../src/yukino";

const logger = yukino.logger(yukino.LogLevel.DEBUG, [
  yukino.consoletransport(yukino.prettyformatter()),
]);

logger.debug("Debug message");
logger.info("Server started", { port: 3000 });
logger.warn("Low memory warning");
logger.error("Error occurred", { code: 500 });
logger.fatal("Fatal error, shutting down");
