import { yukino } from "../src/yukino";

const logger = yukino.logger();

(async () => {
  logger.info("Server started", { port: 3000 });
  logger.warn("Low disk space warning");
  logger.error("Database connection failed", { retry: true });
})();
