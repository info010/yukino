import { LogLevel } from "./level";
import { Transport } from "./transport";
import { LogContext, ContextManager } from "./context";
import { safeExecute } from "./error";
import { ConsoleTransport } from "../transports/consoletransport";

/**
 * LogEntry interface
 * Represents a single log message with metadata
 */
export interface LogEntry {
  /** Logging level of the message */
  level: LogLevel;
  /** The log message text */
  message: string;
  /** Timestamp when the log entry was created */
  timestamp: Date;
  /** Optional context object with metadata */
  context?: LogContext;
}

/**
 * Logger class
 * - Manages log levels
 * - Sends log entries to one or more transports
 * - Supports context metadata
 */
export class Logger {
  private minLevel: LogLevel;
  private transports: Transport[] = [];
  private contextManager: ContextManager;

  /**
   * Constructor
   * @param minLevel Minimum log level to output (default INFO)
   * @param transports Array of Transport instances (default ConsoleTransport)
   * @param context Optional initial context for the logger
   */
  constructor(
    minLevel: LogLevel = LogLevel.INFO,
    transports: Transport[] = [new ConsoleTransport()],
    context?: LogContext
  ) {
    this.minLevel = minLevel;
    this.transports = transports;
    this.contextManager = new ContextManager(context);
  }

  /**
   * Add a new transport to the logger
   * @param transport Transport instance to add
   */
  addTransport(transport: Transport) {
    this.transports.push(transport);
  }

  /**
   * Creates a child logger with additional context
   * @param extra Extra context to merge with existing context
   * @returns A new Logger instance with merged context
   */
  withContext(extra: LogContext): Logger {
    return new Logger(this.minLevel, this.transports, {
      ...this.contextManager.getAll(),
      ...extra,
    });
  }

  /**
   * Emit a log entry to all transports
   * @param entry LogEntry to emit
   */
  private emit(entry: LogEntry) {
    for (const t of this.transports) {
      safeExecute(() => t.log(entry), undefined);
    }
  }

  /**
   * Internal method to create and emit log entries
   * @param level LogLevel of the message
   * @param message Log message
   * @param context Optional context for this entry
   */
  private log(level: LogLevel, message: string, context?: LogContext) {
    if (level > this.minLevel) return;
    const mergedContext = this.contextManager.merge(context ?? {}).getAll();

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      context: mergedContext,
    };
    this.emit(entry);
  }

  /** Log a FATAL level message */
  fatal(msg: string, ctx?: LogContext) {
    this.log(LogLevel.FATAL, msg, ctx);
  }

  /** Log an ERROR level message */
  error(msg: string, ctx?: LogContext) {
    this.log(LogLevel.ERROR, msg, ctx);
  }

  /** Log a WARN level message */
  warn(msg: string, ctx?: LogContext) {
    this.log(LogLevel.WARN, msg, ctx);
  }

  /** Log an INFO level message */
  info(msg: string, ctx?: LogContext) {
    this.log(LogLevel.INFO, msg, ctx);
  }

  /** Log a DEBUG level message */
  debug(msg: string, ctx?: LogContext) {
    this.log(LogLevel.DEBUG, msg, ctx);
  }

  /** Log a TRACE level message */
  trace(msg: string, ctx?: LogContext) {
    this.log(LogLevel.TRACE, msg, ctx);
  }
}

/**
 * Factory function to create a new Logger instance
 * @param minLevel Minimum log level
 * @param transports Array of Transport instances
 * @param context Optional initial context
 * @returns A new Logger instance
 */
export function logger(
  minLevel?: LogLevel,
  transports?: Transport[],
  context?: LogContext
): Logger {
  return new Logger(minLevel, transports, context);
}
