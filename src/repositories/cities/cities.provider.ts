import { DataSource } from 'typeorm';
import { CityRepository } from './cities.repository';

export const citiesProviders = [
  {
    provide: CityRepository,
    useFactory: (dataSource: DataSource) => new CityRepository(dataSource),
    inject: ['DATA_SOURCE'],
  },
];