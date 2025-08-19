/**
 * TimeUtil
 * - Helper functions for log timestamps and related operations
 */

/**
 * Get the current time as an ISO string
 * @returns Current timestamp in ISO 8601 format
 */
export function nowISO(): string {
  return new Date().toISOString();
}

/**
 * Format a Date object as YYYY-MM-DD
 * @param date Optional Date object (default: current date)
 * @returns Formatted date string
 */
export function formatDate(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Get the current timestamp in milliseconds
 * @returns Number of milliseconds since Unix epoch
 */
export function timestamp(): number {
  return Date.now();
}
