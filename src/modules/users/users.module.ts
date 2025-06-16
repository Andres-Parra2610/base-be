import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../../database/database.module';
import { userProviders } from './users.providers';
import { UserRepository } from './user.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    ...userProviders,
    UsersService,
  ],
  exports: [UsersService, UserRepository],
})
export class UsersModule { }
