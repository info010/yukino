import { describe, it, expect } from "vitest";

describe("Examples run without errors", () => {
  it("basic-logger.ts should run without throwing", async () => {
    const run = async () => {
      await import("../examples/basic-logger");
    };
    await expect(run()).resolves.not.toThrow();
  });

  it("async-logger.ts should run without throwing", async () => {
    const run = async () => {
      await import("../examples/async-logger");
    };
    await expect(run()).resolves.not.toThrow();
  });

  it("file-logger.ts should run without throwing", async () => {
    const run = async () => {
      await import("../examples/file-logger");
    };
    await expect(run()).resolves.not.toThrow();
  });
});
