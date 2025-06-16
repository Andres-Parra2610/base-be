import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { SalesOrdersModule } from './modules/sales-orders/sales-orders.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/guards/auth.guard';

@Module({
  imports: [DatabaseModule, UsersModule, SalesOrdersModule, AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule { }
