import { describe, it, expect, beforeEach, vi } from "vitest";
import { yukino } from "../src/yukino";

describe("Logger Tests", () => {
  let logger: yukino.Logger;
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    const consoleTransport = yukino.consoletransport();
    logger = yukino.logger(yukino.LogLevel.DEBUG, [consoleTransport]);
    consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("should log info messages", () => {
    logger.info("Test info");
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("should not log messages below level", () => {
    logger = yukino.logger(yukino.LogLevel.WARN, [yukino.consoletransport()]);
    logger.info("Should not log");
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it("should include context in logs", () => {
    const context = { user: "test" };
    logger.info("Test context", context);
    const lastCall = consoleSpy.mock.calls[0][0];
    expect(lastCall).toContain("user");
  });
});
