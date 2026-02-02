#!/bin/bash

# Exit on error
set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <module-name>"
  echo "Example: $0 product-category"
  exit 1
fi

MODULE_NAME=$1

# Convert MODULE_NAME (kebab-case) to PascalCase and camelCase
# MacOS compatible sed/awk usage
PASCAL_CASE=$(echo "$MODULE_NAME" | awk -F'-' '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1' OFS='')
CAMEL_CASE=$(echo "$MODULE_NAME" | awk -F'-' '{printf $1; for(i=2;i<=NF;i++) printf toupper(substr($i,1,1)) substr($i,2); print ""}')

BASE_DIR="src/modules/$MODULE_NAME"

echo "Generating module: $MODULE_NAME"
echo "PascalCase: $PASCAL_CASE"
echo "camelCase: $CAMEL_CASE"

# Create Directory Structure (Note: intentional typos 'infrastucture' and 'respositories' to match project)
mkdir -p "$BASE_DIR/application/interfaces"
mkdir -p "$BASE_DIR/application/use-cases"
mkdir -p "$BASE_DIR/domain/exceptions"
mkdir -p "$BASE_DIR/domain/models"
mkdir -p "$BASE_DIR/domain/ports"
mkdir -p "$BASE_DIR/infrastucture/http/dto"
mkdir -p "$BASE_DIR/infrastucture/persistence/entities"
mkdir -p "$BASE_DIR/infrastucture/persistence/mappers"
mkdir -p "$BASE_DIR/infrastucture/persistence/respositories"
mkdir -p "$BASE_DIR/providers"

# ==========================================
# DOMAIN LAYER
# ==========================================

# 1. Model
cat > "$BASE_DIR/domain/models/$MODULE_NAME.model.ts" <<EOL
import { BaseModel, BaseModelParams } from '@/shared/domain/models/base.model';

export interface ${PASCAL_CASE}ModelParams extends BaseModelParams {
  // Add properties here
  name: string;
}

export class ${PASCAL_CASE}Model extends BaseModel<${PASCAL_CASE}ModelParams> {
  name: string;

  constructor(params: ${PASCAL_CASE}ModelParams) {
    super(params);
    this.name = params.name;
  }
}
EOL

# 2. Port (Repository Interface)
cat > "$BASE_DIR/domain/ports/$MODULE_NAME-repository.port.ts" <<EOL
import { IBaseRepository } from '@/shared/domain/ports/base-repository.port';
import { ${PASCAL_CASE}Model } from '../models/$MODULE_NAME.model';

export interface I${PASCAL_CASE}Repository extends IBaseRepository<${PASCAL_CASE}Model> {}
EOL

# ==========================================
# APPLICATION LAYER
# ==========================================

# 3. Interfaces
cat > "$BASE_DIR/application/interfaces/create-$MODULE_NAME.interface.ts" <<EOL
export interface ICreate${PASCAL_CASE} {
  name: string;
}
EOL

cat > "$BASE_DIR/application/interfaces/update-$MODULE_NAME.interface.ts" <<EOL
import { ICreate${PASCAL_CASE} } from './create-$MODULE_NAME.interface';

export interface IUpdate${PASCAL_CASE} extends Partial<ICreate${PASCAL_CASE}> {}
EOL

# 4. Use Cases
# Create
cat > "$BASE_DIR/application/use-cases/create-$MODULE_NAME.usecase.ts" <<EOL
import { I${PASCAL_CASE}Repository } from '../../domain/ports/$MODULE_NAME-repository.port';
import { ICreate${PASCAL_CASE} } from '../interfaces/create-$MODULE_NAME.interface';
import { ${PASCAL_CASE}Model } from '../../domain/models/$MODULE_NAME.model';
import { generateUuidV4 } from '@/src/utils/uuid/generate-uuid';

export class Create${PASCAL_CASE}UseCase {
  constructor(private readonly repository: I${PASCAL_CASE}Repository) {}

  async execute(dto: ICreate${PASCAL_CASE}): Promise<${PASCAL_CASE}Model> {
    const entity = new ${PASCAL_CASE}Model({
      id: generateUuidV4(),
      name: dto.name,
    });
    return this.repository.create(entity);
  }
}
EOL

# Find All
cat > "$BASE_DIR/application/use-cases/find-all-$MODULE_NAME.usecase.ts" <<EOL
import { I${PASCAL_CASE}Repository } from '../../domain/ports/$MODULE_NAME-repository.port';
import { QueryDto } from '@/src/utils/dto/pagination.dto';
import { PaginationResponse } from '@/src/shared/infrastructure/types/pagination.type';
import { ${PASCAL_CASE}Model } from '../../domain/models/$MODULE_NAME.model';

export class FindAll${PASCAL_CASE}UseCase {
  constructor(private readonly repository: I${PASCAL_CASE}Repository) {}

  async execute(query: QueryDto): Promise<PaginationResponse<${PASCAL_CASE}Model>> {
    return this.repository.findAll(query);
  }
}
EOL

# Find One
cat > "$BASE_DIR/application/use-cases/find-one-$MODULE_NAME.usecase.ts" <<EOL
import { I${PASCAL_CASE}Repository } from '../../domain/ports/$MODULE_NAME-repository.port';
import { ${PASCAL_CASE}Model } from '../../domain/models/$MODULE_NAME.model';

export class FindOne${PASCAL_CASE}UseCase {
  constructor(private readonly repository: I${PASCAL_CASE}Repository) {}

  async execute(id: string): Promise<${PASCAL_CASE}Model | null> {
    return this.repository.findById(id);
  }
}
EOL

# Update
cat > "$BASE_DIR/application/use-cases/update-$MODULE_NAME.usecase.ts" <<EOL
import { I${PASCAL_CASE}Repository } from '../../domain/ports/$MODULE_NAME-repository.port';
import { IUpdate${PASCAL_CASE} } from '../interfaces/update-$MODULE_NAME.interface';
import { ${PASCAL_CASE}Model } from '../../domain/models/$MODULE_NAME.model';
import { ApplicationError } from '@/src/utils/errors/application.error';

export class Update${PASCAL_CASE}UseCase {
  constructor(private readonly repository: I${PASCAL_CASE}Repository) {}

  async execute(input: IUpdate${PASCAL_CASE} & { id: string }): Promise<${PASCAL_CASE}Model | null> {
    const { id, ...params } = input;
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new ApplicationError('Entity not found');
    }
    const updatedEntity = entity.cloneWith(params);
    return this.repository.update(updatedEntity);
  }
}
EOL

# Delete
cat > "$BASE_DIR/application/use-cases/delete-$MODULE_NAME.usecase.ts" <<EOL
import { I${PASCAL_CASE}Repository } from '../../domain/ports/$MODULE_NAME-repository.port';

export class Delete${PASCAL_CASE}UseCase {
  constructor(private readonly repository: I${PASCAL_CASE}Repository) {}

  async execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
EOL

# ==========================================
# INFRASTRUCTURE LAYER
# ==========================================

# 5. DTOs
cat > "$BASE_DIR/infrastucture/http/dto/create-$MODULE_NAME.dto.ts" <<EOL
import { IsString, IsNotEmpty } from 'class-validator';
import { ICreate${PASCAL_CASE} } from '../../../application/interfaces/create-$MODULE_NAME.interface';

export class Create${PASCAL_CASE}Dto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
EOL

cat > "$BASE_DIR/infrastucture/http/dto/update-$MODULE_NAME.dto.ts" <<EOL
import { PartialType } from '@nestjs/mapped-types';
import { Create${PASCAL_CASE}Dto } from './create-$MODULE_NAME.dto';
import { IUpdate${PASCAL_CASE} } from '../../../application/interfaces/update-$MODULE_NAME.interface';

export class Update${PASCAL_CASE}Dto extends PartialType(Create${PASCAL_CASE}Dto) {}
EOL

# 6. TypeORM Entity
cat > "$BASE_DIR/infrastucture/persistence/entities/$MODULE_NAME.entity.ts" <<EOL
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@/src/shared/infrastructure/persistent/typeorm/entity/base-entity';

@Entity('${CAMEL_CASE}s')
export class ${PASCAL_CASE}Entity extends BaseEntity {
  @Column()
  name: string;
}
EOL

# 7. Mapper
cat > "$BASE_DIR/infrastucture/persistence/mappers/$MODULE_NAME.mapper.ts" <<EOL
import { ${PASCAL_CASE}Model } from '../../../domain/models/$MODULE_NAME.model';
import { ${PASCAL_CASE}Entity } from '../entities/$MODULE_NAME.entity';

export class ${PASCAL_CASE}Mapper {
  static toDomain(entity: ${PASCAL_CASE}Entity): ${PASCAL_CASE}Model {
    return new ${PASCAL_CASE}Model(entity);
  }

  static toPersistence(domain: ${PASCAL_CASE}Model): ${PASCAL_CASE}Entity {
    const entity = new ${PASCAL_CASE}Entity();
    Object.assign(entity, domain);
    return entity;
  }
}
EOL

# 8. Repository Implementation
cat > "$BASE_DIR/infrastucture/persistence/respositories/$MODULE_NAME.repository.ts" <<EOL
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { I${PASCAL_CASE}Repository } from '../../../domain/ports/$MODULE_NAME-repository.port';
import { ${PASCAL_CASE}Model } from '../../../domain/models/$MODULE_NAME.model';
import { ${PASCAL_CASE}Entity } from '../entities/$MODULE_NAME.entity';
import { PaginationResponse } from '@/src/shared/infrastructure/types/pagination.type';
import { QueryDto } from '@/src/utils/dto/pagination.dto';

@Injectable()
export class ${PASCAL_CASE}Repository implements I${PASCAL_CASE}Repository {
  private readonly repository: Repository<${PASCAL_CASE}Entity>;

  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository(${PASCAL_CASE}Entity);
  }

  create(entity: ${PASCAL_CASE}Model): Promise<${PASCAL_CASE}Model> {
    throw new Error('Method not implemented.');
  }

  update(entity: ${PASCAL_CASE}Model): Promise<${PASCAL_CASE}Model> {
    throw new Error('Method not implemented.');
  }

  delete(id: string, hard?: boolean): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<${PASCAL_CASE}Model | null> {
    throw new Error('Method not implemented.');
  }

  findAll(queryDto: QueryDto): Promise<PaginationResponse<${PASCAL_CASE}Model>> {
    throw new Error('Method not implemented.');
  }
}
EOL

# 9. Controller
cat > "$BASE_DIR/infrastucture/http/$MODULE_NAME.controller.ts" <<EOL
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { Create${PASCAL_CASE}UseCase } from '../../application/use-cases/create-$MODULE_NAME.usecase';
import { FindAll${PASCAL_CASE}UseCase } from '../../application/use-cases/find-all-$MODULE_NAME.usecase';
import { FindOne${PASCAL_CASE}UseCase } from '../../application/use-cases/find-one-$MODULE_NAME.usecase';
import { Update${PASCAL_CASE}UseCase } from '../../application/use-cases/update-$MODULE_NAME.usecase';
import { Delete${PASCAL_CASE}UseCase } from '../../application/use-cases/delete-$MODULE_NAME.usecase';
import { Create${PASCAL_CASE}Dto } from './dto/create-$MODULE_NAME.dto';
import { Update${PASCAL_CASE}Dto } from './dto/update-$MODULE_NAME.dto';
import { QueryDto } from '@/src/utils/dto/pagination.dto';

@Controller('$MODULE_NAME')
export class ${PASCAL_CASE}Controller {
  constructor(
    private readonly createUseCase: Create${PASCAL_CASE}UseCase,
    private readonly findAllUseCase: FindAll${PASCAL_CASE}UseCase,
    private readonly findOneUseCase: FindOne${PASCAL_CASE}UseCase,
    private readonly updateUseCase: Update${PASCAL_CASE}UseCase,
    private readonly deleteUseCase: Delete${PASCAL_CASE}UseCase,
  ) {}

  @Post()
  async create(@Body() dto: Create${PASCAL_CASE}Dto) {
    return await this.createUseCase.execute(dto);
  }

  @Get()
  async findAll(@Query() query: QueryDto) {
    return await this.findAllUseCase.execute(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.findOneUseCase.execute(id);
  }

  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: Update${PASCAL_CASE}Dto) {
    return await this.updateUseCase.execute({ ...dto, id });
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.deleteUseCase.execute(id);
  }
}
EOL

# ==========================================
# WIRING
# ==========================================

# 10. Providers
cat > "$BASE_DIR/providers/$MODULE_NAME-usecase.providers.ts" <<EOL
import { Provider } from '@nestjs/common';
import { Create${PASCAL_CASE}UseCase } from '../application/use-cases/create-$MODULE_NAME.usecase';
import { FindAll${PASCAL_CASE}UseCase } from '../application/use-cases/find-all-$MODULE_NAME.usecase';
import { FindOne${PASCAL_CASE}UseCase } from '../application/use-cases/find-one-$MODULE_NAME.usecase';
import { Update${PASCAL_CASE}UseCase } from '../application/use-cases/update-$MODULE_NAME.usecase';
import { Delete${PASCAL_CASE}UseCase } from '../application/use-cases/delete-$MODULE_NAME.usecase';

export const ${CAMEL_CASE}UseCaseProviders: Provider[] = [
  {
    provide: Create${PASCAL_CASE}UseCase,
    useFactory: (repo) => new Create${PASCAL_CASE}UseCase(repo),
    inject: ['${PASCAL_CASE}Repository'],
  },
  {
    provide: FindAll${PASCAL_CASE}UseCase,
    useFactory: (repo) => new FindAll${PASCAL_CASE}UseCase(repo),
    inject: ['${PASCAL_CASE}Repository'],
  },
  {
    provide: FindOne${PASCAL_CASE}UseCase,
    useFactory: (repo) => new FindOne${PASCAL_CASE}UseCase(repo),
    inject: ['${PASCAL_CASE}Repository'],
  },
  {
    provide: Update${PASCAL_CASE}UseCase,
    useFactory: (repo) => new Update${PASCAL_CASE}UseCase(repo),
    inject: ['${PASCAL_CASE}Repository'],
  },
  {
    provide: Delete${PASCAL_CASE}UseCase,
    useFactory: (repo) => new Delete${PASCAL_CASE}UseCase(repo),
    inject: ['${PASCAL_CASE}Repository'],
  },
];
EOL

# 11. Module Definition
cat > "$BASE_DIR/$MODULE_NAME.module.ts" <<EOL
import { Module } from '@nestjs/common';
import { ${PASCAL_CASE}Repository } from './infrastucture/persistence/respositories/$MODULE_NAME.repository';
import { ${PASCAL_CASE}Controller } from './infrastucture/http/$MODULE_NAME.controller';
import { ${CAMEL_CASE}UseCaseProviders } from './providers/$MODULE_NAME-usecase.providers';
import { DatabaseModule } from '@/src/shared/infrastructure/persistent/typeorm/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: '${PASCAL_CASE}Repository',
      useClass: ${PASCAL_CASE}Repository,
    },
    ...${CAMEL_CASE}UseCaseProviders,
  ],
  controllers: [${PASCAL_CASE}Controller],
  exports: [...${CAMEL_CASE}UseCaseProviders],
})
export class ${PASCAL_CASE}Module {}
EOL

echo "Module $MODULE_NAME generated successfully at $BASE_DIR"
