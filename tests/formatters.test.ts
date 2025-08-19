import { describe, it, expect } from "vitest";
import { yukino } from "../src/yukino";

describe("Formatter Tests", () => {
  const entry: yukino.LogEntry = {
    level: 1,
    message: "Test message",
    timestamp: new Date("2025-08-19T12:00:00Z"),
    context: { user: "test" },
  };

  it("JsonFormatter should output valid JSON", () => {
    const formatter = yukino.jsonformatter();
    const result = formatter.format(entry);
    const parsed = JSON.parse(result);
    expect(parsed.message).toBe("Test message");
    expect(parsed.context.user).toBe("test");
  });

  it("PrettyFormatter should output string with level", () => {
    const formatter = yukino.prettyformatter();
    const result = formatter.format(entry);
    expect(result).toContain("Test message");
  });
});
