import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../../database/database.module';
import { UserIdentificationValidator } from './validators/user-identification.validator';
import { CreateManyUsers } from './use-cases/command/create-many-users.usecase';
import { CreateUsersUseCase } from './use-cases/command/create-users.usecase';
import { UpdateUsersUseCase } from './use-cases/command/update-users.usecase';
import { FindAllUsersUseCase } from './use-cases/query/find-all-users.usecase';
import { FindOneUsersUseCase } from './use-cases/query/find-one-users.usecase';
import { RemoveUsersUseCase } from './use-cases/command/remove-users.usecase';
import { UsersHandlers } from './users.handlers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersHandlers,
    UserIdentificationValidator,
    CreateManyUsers,
    CreateUsersUseCase,
    UpdateUsersUseCase,
    FindAllUsersUseCase,
    FindOneUsersUseCase,
    RemoveUsersUseCase,
  ],
})
export class UsersModule { }
