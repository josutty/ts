type Meta = Record<string, unknown> | undefined;
const noop = (message: string, meta?: Meta) => {
  void message;
  void meta;
};
export const logger = {
  debug: import.meta.env.PROD ? noop : (message: string, meta?: Meta) => console.debug(message, meta),
  info: import.meta.env.PROD ? noop : (message: string, meta?: Meta) => console.info(message, meta),
  warn: (message: string, meta?: Meta) => console.warn(message, meta),
  error: (message: string, meta?: Meta) => console.error(message, meta),
};
