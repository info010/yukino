import { LogEntry } from "./logger";
import { Formatter } from "./formatter";
import { PrettyFormatter } from "../formatters/prettyformatter";

/**
 * Transport interface
 * - Defines a contract for log transports
 * - Every transport must implement the `log` method
 */
export interface Transport {
  /** Optional formatter to format log entries */
  formatter?: Formatter;

  /**
   * Log a single entry
   * @param entry The log entry to process
   * @returns void or a Promise<void> if async
   */
  log(entry: LogEntry): void | Promise<void>;
}

/**
 * Synchronous Transporter
 * - Base class for all synchronous transports
 * - Must implement the `log` method
 */
export abstract class SyncTransporter implements Transport {
  formatter: Formatter;

  /**
   * Constructor
   * @param formatter Optional formatter instance (default: PrettyFormatter)
   */
  constructor(formatter?: Formatter) {
    this.formatter = formatter ?? new PrettyFormatter();
  }

  /** Abstract method to log an entry synchronously */
  abstract log(entry: LogEntry): void;
}

/**
 * Asynchronous Transporter
 * - Base class for all asynchronous transports
 * - Must implement the `log` method returning a Promise
 */
export abstract class AsyncTransporter implements Transport {
  formatter: Formatter;

  /**
   * Constructor
   * @param formatter Optional formatter instance (default: PrettyFormatter)
   */
  constructor(formatter?: Formatter) {
    this.formatter = formatter ?? new PrettyFormatter();
  }

  /** Abstract method to log an entry asynchronously */
  abstract log(entry: LogEntry): Promise<void>;
}
