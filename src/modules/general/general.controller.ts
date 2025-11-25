import { Controller, Get, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { GeneralService } from './general.service';

@Controller('general')
export class GeneralController {
  constructor(private readonly generalService: GeneralService) { }

  @Get('bcv')
  async findLastBCV() {
    return await this.generalService.findLastBCV();
  }

  @Get('states')
  async findAllStates(@Query('id', new ParseUUIDPipe({ version: '4', optional: true })) id?: string) {
    return await this.generalService.findAllStates(id);
  }

  @Get('cities')
  findAllCities(@Query('state_id', new ParseUUIDPipe({ version: '4', optional: true })) stateId?: string) {
    return this.generalService.findAllCities(stateId);
  }

}
