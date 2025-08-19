import { Formatter } from "../core/formatter";
import { LogEntry } from "../core/logger";
import { getLevelName } from "../core/level";

/**
 * Pretty Formatter
 * - Produces human-readable, colorized logs for console output
 * - Colors vary based on log level (e.g., FATAL=bright red, INFO=green)
 */
export class PrettyFormatter implements Formatter {
  /** Mapping of log levels to ANSI color codes */
  private colorMap: Record<string, string> = {
    FATAL: "\x1b[31;1m", // bright red
    ERROR: "\x1b[31m", // red
    WARN: "\x1b[33m", // yellow
    INFO: "\x1b[32m", // green
    DEBUG: "\x1b[36m", // cyan
    TRACE: "\x1b[90m", // gray
  };

  /**
   * Format a log entry as a human-readable, colorized string
   * @param entry The log entry to format
   * @returns Formatted string with timestamp, level, message, and context
   */
  format(entry: LogEntry): string {
    const color = this.colorMap[entry.level] || "";
    const reset = "\x1b[0m";
    const ts = entry.timestamp.toISOString();
    const ctx = entry.context ? JSON.stringify(entry.context) : "";

    return `${color}[${ts}] [${getLevelName(entry.level)}]${reset} ${entry.message} ${ctx}`;
  }
}

/**
 * Factory function to create a new PrettyFormatter instance
 * @returns A new PrettyFormatter
 */
export function prettyformatter(): PrettyFormatter {
  return new PrettyFormatter();
}