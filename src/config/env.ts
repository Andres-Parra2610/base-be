import 'dotenv/config';

import * as joi from 'joi';
import { LogLevel, VALID_LOG_LEVELS } from '@/shared/generals/logger/logger.types';

interface Envs {
  NODE_ENV: string;
  PORT: string;
  DATABASE_HOST: string;
  DATABASE_PORT: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  JWT_SECRET: string;
  JWT_REFRESH_TOKEN: string;
  LOGGER_LEVEL: LogLevel[];
}
const envSchema = joi
  .object({
    NODE_ENV: joi.string().required(),
    PORT: joi.string().required(),
    DATABASE_HOST: joi.string().required(),
    DATABASE_PORT: joi.string().required(),
    DATABASE_USER: joi.string().required(),
    DATABASE_PASSWORD: joi.string().required(),
    DATABASE_NAME: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    JWT_REFRESH_TOKEN: joi.string().required(),
    LOGGER_LEVEL: joi
      .string()
      .optional()
      .default('log')
      .custom((value, helpers) => {
        const levels = value.split(',').map((item: string) => item.trim());
        const hasInvalidLevel = levels.some(
          (level: string) => !(VALID_LOG_LEVELS as readonly string[]).includes(level),
        );
        if (hasInvalidLevel) {
          throw new Error(`Invalid log level. Allowed: ${VALID_LOG_LEVELS.join(', ')}`);
        }
        return levels;
      }),
  })
  .unknown(true);

const { error, value } = envSchema.validate({
  ...process.env,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN,
  LOGGER_LEVEL: process.env.LOGGER_LEVEL,
});
if (error) throw new Error('Config validation issue ' + error.message);

export const env: Envs = value;
