import { Module } from '@nestjs/common';
import { GeneralService } from './general.service';
import { GeneralController } from './general.controller';
import { DatabaseModule } from '../../database/database.module';
import { FindAllCitiesUseCase } from './use-cases/query/find-cities.usecase';
import { FindAllStatesUseCase } from './use-cases/query/find-states.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [GeneralController],
  providers: [
    GeneralService,
    FindAllCitiesUseCase,
    FindAllStatesUseCase,
  ],
})
export class GeneralModule { }
