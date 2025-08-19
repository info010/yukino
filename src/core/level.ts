/**
 * LogLevel enum
 * - Represents different logging levels with increasing verbosity
 */
export enum LogLevel {
  /** Critical errors that cause the system to terminate */
  FATAL = 0,
  /** Standard error messages */
  ERROR = 1,
  /** Warnings about potential issues */
  WARN = 2,
  /** Informational messages about system state */
  INFO = 3,
  /** Debug messages for development */
  DEBUG = 4,
  /** Trace messages for detailed debugging */
  TRACE = 5,
}

/**
 * Get the string representation of a LogLevel
 * @param level LogLevel enum value
 * @returns The name of the logging level as a string
 *
 * @example
 * getLevelName(LogLevel.ERROR) // returns "ERROR"
 */
export function getLevelName(level: LogLevel): string {
  return LogLevel[level];
}
