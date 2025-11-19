import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { ClsModule } from 'nestjs-cls';
import { RequestInterceptor } from './core/interceptors/request.interceptor';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
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
