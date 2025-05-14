/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-base-to-string */
import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'cyan',
  verbose: 'blue',
});

export const WinstonLoggerConfig: WinstonModuleOptions = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        winston.format.colorize({ all: true }),
        winston.format.printf((info: winston.Logform.TransformableInfo) => {
          const timestamp = info.timestamp ?? new Date();
          const level = info.level ?? 'info';
          const context = info.context ?? 'App';
          const message = info.message ?? '';
          return `[${timestamp}] ${level} [${context}] ${message}`;
        }),
      ),
    }),
  ],
};
