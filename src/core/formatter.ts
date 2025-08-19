import { LogEntry } from "./logger";

/**
 * Formatter interface
 * - Defines a contract for formatting log entries
 * - Each formatter must implement the `format` method to convert a LogEntry into a string
 */
export interface Formatter {
  /**
   * Format a log entry into a string
   * @param entry The log entry to format
   * @returns The formatted string representation of the log entry
   */
  format(entry: LogEntry): string;
}
