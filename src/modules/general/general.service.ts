import { Injectable } from '@nestjs/common';
import { FindAllCitiesUseCase } from './use-cases/query/find-cities.usecase';
import { FindAllStatesUseCase } from './use-cases/query/find-states.usecase';
import { FindLastBCVUseCase } from './use-cases/query/find-bcv.usecase';

@Injectable()
export class GeneralService {
  constructor(
    private readonly findAllCitiesUseCase: FindAllCitiesUseCase,
    private readonly findAllStatesUseCase: FindAllStatesUseCase,
    private readonly findLastBCVUseCase: FindLastBCVUseCase,
  ) { }

  findAllCities(stateId?: string) {
    return this.findAllCitiesUseCase.execute(stateId);
  }

  findAllStates(stateId?: string) {
    return this.findAllStatesUseCase.execute(stateId);
  }

  findLastBCV() {
    return this.findLastBCVUseCase.execute();
  }
}
