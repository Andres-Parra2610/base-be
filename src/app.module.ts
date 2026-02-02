import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClsModule } from 'nestjs-cls';
import { RequestInterceptor } from './core/interceptors/request.interceptor';
import { APP_MODULES } from './modules';

@Module({
  imports: [
    ...APP_MODULES,
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInterceptor,
    },
  ],
})
export class AppModule {}
