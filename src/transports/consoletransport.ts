import { SyncTransporter, AsyncTransporter } from "../core/transport";
import { LogEntry } from "../core/logger";
import { Formatter } from "../core/formatter";

/**
 * ConsoleTransport
 * - Synchronous transport that outputs logs to console.log
 * - Uses PrettyFormatter as default if no formatter is provided
 */
export class ConsoleTransport extends SyncTransporter {
  /**
   * Log a single entry synchronously
   * @param entry The log entry to log
   */
  log(entry: LogEntry): void {
    console.log(this.formatter.format(entry));
  }
}

/**
 * AsyncConsoleTransport
 * - Asynchronous transport that outputs logs to console.log
 * - Can be awaited if needed
 */
export class AsyncConsoleTransport extends AsyncTransporter {
  /**
   * Constructor
   * @param formatter Optional formatter instance (default: PrettyFormatter)
   */
  constructor(formatter?: Formatter) {
    super(formatter);
  }

  /**
   * Log a single entry asynchronously
   * @param entry The log entry to log
   * @returns Promise<void> resolved after logging
   */
  async log(entry: LogEntry): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(this.formatter.format(entry));
        resolve();
      }, 0);
    });
  }
}

/**
 * Factory function to create a new ConsoleTransport
 * @param formatter Optional formatter instance
 * @returns A new ConsoleTransport instance
 */
export function consoletransport(formatter?: Formatter): ConsoleTransport {
  return new ConsoleTransport(formatter);
}

/**
 * Factory function to create a new AsyncConsoleTransport
 * @param formatter Optional formatter instance
 * @param timeout Optional timeout in milliseconds (default 0)
 * @returns A new AsyncConsoleTransport instance
 */
export function asyncconsoletransport(
  formatter?: Formatter,
  timeout?: number
): AsyncConsoleTransport {
  return new AsyncConsoleTransport(formatter);
}
