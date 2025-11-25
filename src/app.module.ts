import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './modules/auth/guards/auth.guard';
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
      }
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInterceptor,
    },
  ]
})
export class AppModule { }
