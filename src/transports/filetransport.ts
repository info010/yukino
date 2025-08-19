import { SyncTransporter, AsyncTransporter } from "../core/transport";
import { LogEntry } from "../core/logger";
import { Formatter } from "../core/formatter";
import { ensureDirExists, appendFile, appendFileAsync } from "../utils/fileutil";

/**
 * FileTransport
 * - Synchronous transport that writes logs to a file
 * - Ensures the directory exists before writing
 * - Uses PrettyFormatter as default if no formatter is provided
 */
export class FileTransport extends SyncTransporter {
  private filePath: string;

  /**
   * Constructor
   * @param filePath Path to the log file
   * @param formatter Optional formatter instance (default: PrettyFormatter)
   */
  constructor(filePath: string, formatter?: Formatter) {
    super(formatter);
    this.filePath = filePath;
    ensureDirExists(this.filePath);
  }

  /**
   * Log a single entry synchronously to the file
   * @param entry The log entry to write
   */
  log(entry: LogEntry): void {
    const line = this.formatter.format(entry) + "\n";
    appendFile(this.filePath, line);
  }
}

/**
 * AsyncFileTransport
 * - Asynchronous transport that writes logs to a file
 * - Can be awaited for completion
 */
export class AsyncFileTransport extends AsyncTransporter {
  private filePath: string;

  /**
   * Constructor
   * @param filePath Path to the log file
   * @param formatter Optional formatter instance (default: PrettyFormatter)
   */
  constructor(filePath: string, formatter?: Formatter) {
    super(formatter);
    this.filePath = filePath;
    ensureDirExists(this.filePath);
  }

  /**
   * Log a single entry asynchronously to the file
   * @param entry The log entry to write
   * @returns Promise<void> resolved when writing completes
   */
  async log(entry: LogEntry): Promise<void> {
    const line = this.formatter.format(entry) + "\n";
    return appendFileAsync(this.filePath, line);
  }
}

/**
 * Factory function to create a new FileTransport
 * @param filePath Path to the log file
 * @param formatter Optional formatter instance
 * @returns A new FileTransport instance
 */
export function filetransport(
  filePath: string,
  formatter?: Formatter
): FileTransport {
  return new FileTransport(filePath, formatter);
}

/**
 * Factory function to create a new AsyncFileTransport
 * @param filePath Path to the log file
 * @param formatter Optional formatter instance
 * @returns A new AsyncFileTransport instance
 */
export function asyncfiletransport(
  filePath: string,
  formatter?: Formatter
): AsyncFileTransport {
  return new AsyncFileTransport(filePath, formatter);
}
