import { env } from 'src/config/env';
import { DataSource } from 'typeorm';
import { join } from 'path';
import { NODE_ENV } from '@/src/shared/types/node_env.type';

const isProduction = env.NODE_ENV === NODE_ENV.PRODUCTION;

// Resolves to 'src' (development) or 'dist' (production)
// path: /src/shared/infrastructure/persistent/typeorm/
const baseDir = join(__dirname, '../../../../');

export const dataSource = new DataSource({
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: Number(env.DATABASE_PORT),
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  entities: [join(baseDir, '**', '*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
  subscribers: [join(__dirname, 'subscribers', '*{.ts,.js}')],
  migrationsTableName: 'migrations',
  synchronize: false,
  ssl: isProduction
    ? {
        rejectUnauthorized: false,
      }
    : false,
});

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];
