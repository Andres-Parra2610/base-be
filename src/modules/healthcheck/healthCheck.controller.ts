import { Public } from '@/src/core/decorators/public.decorator';
import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('healthcheck')
export class HealthCheckController {
  @Get()
  @Public()
  @HttpCode(200)
  check() {
    return {
      status: 'ok',
    };
  }
}
