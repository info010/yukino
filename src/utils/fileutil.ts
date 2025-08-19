import * as fs from "fs";
import * as path from "path";

/**
 * FileUtil
 * - Helper functions for file and directory operations
 */

/**
 * Ensure that the directory of the given file path exists
 * - Creates directories recursively if they do not exist
 * @param filePath Path to the file
 */
export function ensureDirExists(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Get the size of a file in bytes
 * @param filePath Path to the file
 * @returns File size in bytes, 0 if file does not exist
 */
export function fileSize(filePath: string): number {
  if (!fs.existsSync(filePath)) return 0;
  const stats = fs.statSync(filePath);
  return stats.size;
}

/**
 * Read the content of a file synchronously
 * @param filePath Path to the file
 * @param encoding Text encoding (default: "utf-8")
 * @returns File content as a string, empty string if file does not exist
 */
export function readFile(
  filePath: string,
  encoding: BufferEncoding = "utf-8"
): string {
  if (!fs.existsSync(filePath)) return "";
  return fs.readFileSync(filePath, { encoding });
}

/**
 * Read the content of a file asynchronously
 * @param filePath Path to the file
 * @param encoding Text encoding (default: "utf-8")
 * @returns Promise<string> with file content, empty string if file does not exist
 */
export async function readFileAsync(
  filePath: string,
  encoding: BufferEncoding = "utf-8"
): Promise<string> {
  if (!fs.existsSync(filePath)) return "";
  return fs.promises.readFile(filePath, { encoding });
}

/**
 * Append data to a file synchronously
 * - Creates directories if needed
 * @param filePath Path to the file
 * @param data String data to append
 */
export function appendFile(filePath: string, data: string) {
  ensureDirExists(filePath);
  fs.appendFileSync(filePath, data, { encoding: "utf-8" });
}

/**
 * Append data to a file asynchronously
 * - Creates directories if needed
 * @param filePath Path to the file
 * @param data String data to append
 * @returns Promise<void> resolved when writing completes
 */
export async function appendFileAsync(filePath: string, data: string) {
  ensureDirExists(filePath);
  return fs.promises.appendFile(filePath, data, { encoding: "utf-8" });
}
