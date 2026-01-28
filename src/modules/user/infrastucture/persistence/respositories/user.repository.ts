import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { IUserRepository } from "../../../domain/ports/user-repository.port";
import { UserModel } from "../../../domain/models/user.model";
import { InjectRepository } from '@nestjs/typeorm';
import { UserMapper } from "../mappers/user.mapper";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>,
    ) {}

    async create(user: UserModel): Promise<UserModel> {
        const persistenceModel = UserMapper.toEntity(user);
        const savedEntity = await this.repository.save(persistenceModel);
        return UserMapper.toDomain(savedEntity);
    }

    async findAll(): Promise<UserModel[]> {
        const entities = await this.repository.find();
        return entities.map(UserMapper.toDomain);
    }

    async findByEmail(email: string): Promise<UserModel | null> {
        const entity = await this.repository.findOne({ where: { email } });
        if (!entity) return null;
        return UserMapper.toDomain(entity);
    }
    
    async findById(id: string): Promise<UserModel | null> {
        const entity = await this.repository.findOne({ where: { id } });
        if (!entity) return null;
        return UserMapper.toDomain(entity);
    }

    async update(user: UserModel): Promise<UserModel> {
        const persistenceModel = UserMapper.toEntity(user);
        const updatedEntity = await this.repository.save(persistenceModel);
        return UserMapper.toDomain(updatedEntity);
    }

    async delete(id: string): Promise<void> {
        await this.repository.softDelete(id);
    }

    
}