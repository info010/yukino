import { Formatter } from "../core/formatter";
import { LogEntry } from "../core/logger";

/**
 * JSON Formatter
 * - Converts a LogEntry into a JSON string
 * - Useful for structured logging and file/remote logging
 */
export class JsonFormatter implements Formatter {
  /**
   * Format a log entry as a JSON string
   * @param entry The log entry to format
   * @returns JSON string representation of the log entry
   */
  format(entry: LogEntry): string {
    return JSON.stringify({
      level: entry.level,
      message: entry.message,
      timestamp: entry.timestamp.toISOString(),
      context: entry.context ?? {},
    });
  }
}

/**
 * Factory function to create a new JsonFormatter instance
 * @returns A new JsonFormatter
 */
export function jsonformatter(): JsonFormatter {
  return new JsonFormatter();
}
