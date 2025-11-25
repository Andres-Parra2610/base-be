import { DataSource } from 'typeorm';
import { StateRepository } from './states.repository';

export const statesProviders = [
  {
    provide: StateRepository,
    useFactory: (dataSource: DataSource) => new StateRepository(dataSource),
    inject: ['DATA_SOURCE'],
  },
];