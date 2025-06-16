import { DataSource } from 'typeorm';
import { UserRepository } from './user.repository';

export const userProviders = [
  {
    provide: UserRepository,
    useFactory: (dataSource: DataSource) => new UserRepository(dataSource),
    inject: ['DATA_SOURCE'],
  },
];
