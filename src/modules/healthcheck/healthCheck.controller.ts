import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('healthcheck')
export class HealthCheckController {
  @Get()
  @HttpCode(200)
  check() {
    return {
      status: 'ok',
    };
  }
}
