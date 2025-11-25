import { Injectable } from '@nestjs/common';
import { FindAllCitiesUseCase } from './use-cases/query/find-cities.usecase';
import { FindAllStatesUseCase } from './use-cases/query/find-states.usecase';

@Injectable()
export class GeneralService {
  constructor(
    private readonly findAllCitiesUseCase: FindAllCitiesUseCase,
    private readonly findAllStatesUseCase: FindAllStatesUseCase,
  ) { }

  findAllCities(stateId?: string) {
    return this.findAllCitiesUseCase.execute(stateId);
  }

  findAllStates(stateId?: string) {
    return this.findAllStatesUseCase.execute(stateId);
  }
}
