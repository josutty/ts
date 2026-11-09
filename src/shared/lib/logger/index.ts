type LogMeta = Record<string, unknown> | undefined;
const noop = (message: string, meta?: LogMeta) => {
  void message;
  void meta;
};
const log = (level: 'warn' | 'error', message: string, meta?: LogMeta) => {
  if (meta) console[level](message, meta);
  else console[level](message);
};
export const logger = {
  debug: import.meta.env.PROD ? noop : (message: string, meta?: LogMeta) => console.debug(message, meta),
  info: import.meta.env.PROD ? noop : (message: string, meta?: LogMeta) => console.info(message, meta),
  warn: (message: string, meta?: LogMeta) => log('warn', message, meta),
  error: (message: string, meta?: LogMeta) => log('error', message, meta),
};
