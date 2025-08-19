/**
 * LoggerError
 * Custom error class used for logging-related exceptions
 */
export class LoggerError extends Error {
  /**
   * Constructor
   * @param message Error message
   */
  constructor(message: string) {
    super(message);
    this.name = "LoggerError";
  }
}

/**
 * Safe execution wrapper
 * - Executes a callback function safely
 * - Returns a fallback value if the callback throws an error
 *
 * @template T The return type of the callback and fallback
 * @param fn Callback function to execute
 * @param fallback Fallback value to return in case of error
 * @returns The result of the callback or the fallback value
 *
 * @example
 * // Returns empty object on invalid JSON
 * safeExecute(() => JSON.parse("invalid"), {});
 *
 * @example
 * // Returns false if doSomething() throws
 * safeExecute(() => doSomething(), false);
 */
export function safeExecute<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch (err) {
    console.error("[LoggerError]", err);
    return fallback;
  }
}
