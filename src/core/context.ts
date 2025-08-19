/**
 * LogContext interface
 * Represents optional metadata that can be attached to a log message.
 */
export interface LogContext {
  /** Unique request identifier */
  requestId?: string;
  /** User identifier */
  userId?: string;
  /** Session identifier */
  sessionId?: string;
  /** Trace identifier for distributed tracing */
  traceId?: string;
  /** Any additional custom fields */
  [key: string]: unknown; // extendable
}

/**
 * ContextManager
 * - Creates a new context
 * - Extends an existing context
 * - Merges multiple contexts
 */
export class ContextManager {
  /** Internal storage of context key/value pairs */
  private context: LogContext = {};

  /**
   * Constructor
   * @param initial Optional initial context
   */
  constructor(initial?: LogContext) {
    if (initial) {
      this.context = { ...initial };
    }
  }

  /**
   * Add a new key/value pair to the context
   * @param key Context key
   * @param value Context value
   * @returns The current ContextManager instance for chaining
   */
  set(key: string, value: unknown): this {
    this.context[key] = value;
    return this;
  }

  /**
   * Retrieve a value from the context by key
   * @param key Context key
   * @returns The value associated with the key, or undefined if not set
   */
  get(key: string): unknown {
    return this.context[key];
  }

  /**
   * Get all key/value pairs in the context
   * @returns A copy of the entire context object
   */
  getAll(): LogContext {
    return { ...this.context };
  }

  /**
   * Merge the current context with another context
   * @param extra Additional context to merge
   * @returns A new ContextManager instance containing the merged context
   */
  merge(extra: LogContext): ContextManager {
    return new ContextManager({ ...this.context, ...extra });
  }
}

/**
 * Factory function to create a new ContextManager
 * @param initial Optional initial context
 * @returns A new ContextManager instance
 */
export function context(initial?: LogContext): ContextManager {
  return new ContextManager(initial);
}
