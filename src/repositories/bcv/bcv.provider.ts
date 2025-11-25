import { DataSource } from 'typeorm';
import { BCVRepository } from './bcv.repository';

export const BCVProviders = [
  {
    provide: BCVRepository,
    useFactory: (dataSource: DataSource) => new BCVRepository(dataSource),
    inject: ['DATA_SOURCE'],
  },
];