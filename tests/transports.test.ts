import { describe, it, expect, vi, beforeEach } from "vitest";
import { yukino } from "../src/yukino";

describe("Transport Tests", () => {
  let entry: yukino.LogEntry;
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    entry = {
      level: 1,
      message: "Test message",
      timestamp: new Date(),
      context: { user: "test" },
    };
    consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("ConsoleTransport should log sync", () => {
    const transport = yukino.consoletransport(yukino.prettyformatter());
    transport.log(entry);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("AsyncConsoleTransport should log async", async () => {
    const transport = yukino.asyncconsoletransport(yukino.prettyformatter());
    await transport.log(entry);
    expect(consoleSpy).toHaveBeenCalled();
  });
});
