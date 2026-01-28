export const VALID_LOG_LEVELS = ['verbose', 'debug', 'log', 'warn', 'error', 'fatal'] as const;
export type LogLevel = typeof VALID_LOG_LEVELS[number];