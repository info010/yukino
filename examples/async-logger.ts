import { yukino } from "yukino-ts";

const logger = yukino.logger();

logger.info("Server started", { port: 3000 });
logger.warn("Low disk space warning");
logger.error("Database connection failed", { retry: true });
