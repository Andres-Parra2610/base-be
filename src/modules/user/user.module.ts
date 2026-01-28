import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./infrastucture/persistence/entities/user.entity";
import { UserRepository } from "./infrastucture/persistence/respositories/user.repository";
import { CreateUserUseCase } from "./application/use-cases/create-user.usecase";
import { UuidGenerationService } from "@/src/shared/infrastructure/services/uuid-generator.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
    ],
    providers: [
        {
            provide: 'UserRepository',
            useClass: UserRepository
        },
        {
            provide: 'UuidGenerationService',
            useClass: UuidGenerationService
        },
        {
            provide: CreateUserUseCase,
            useFactory: (repo, uuidGenerator) => {
                return new CreateUserUseCase(repo, uuidGenerator);
            },
            inject: ['UserRepository', 'UuidGenerationService']
        }
    ],
    exports: [
        CreateUserUseCase
    ]
})
export class UserModule {}