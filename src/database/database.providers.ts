import { env } from 'src/config/env';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

const isProduction = env.NODE_ENV === 'production';

export const dataSource = new DataSource({
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: Number(env.DATABASE_PORT),
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  synchronize: false,
  ssl: isProduction ? {
    rejectUnauthorized: false,
  } : false,
});

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return addTransactionalDataSource(dataSource).initialize();
    },
  },
];