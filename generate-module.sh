#!/bin/bash

# Check if module name is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <module-name>"
  exit 1
fi

MODULE_NAME=$1
# Convert to PascalCase (e.g., "animals" -> "Animals", "user-profiles" -> "UserProfiles")
MODULE_PASCAL=$(echo "$MODULE_NAME" | awk -F- '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)} 1' OFS='')
# Convert to camelCase (e.g., "animals" -> "animals", "user-profiles" -> "userProfiles")
MODULE_CAMEL=$(echo "$MODULE_NAME" | awk -F- '{for(i=1;i<=NF;i++) if(i==1) $i=tolower($i); else $i=toupper(substr($i,1,1)) substr($i,2)} 1' OFS='')

# Paths
MODULE_PATH="src/modules/$MODULE_NAME"
REPO_PATH="src/repositories/$MODULE_NAME"

echo "Creating module: $MODULE_NAME"
echo "PascalCase: $MODULE_PASCAL"
echo "camelCase: $MODULE_CAMEL"

# Create directories
mkdir -p "$MODULE_PATH/dto"
mkdir -p "$MODULE_PATH/entities"
mkdir -p "$MODULE_PATH/use-cases/command"
mkdir -p "$MODULE_PATH/use-cases/query"
mkdir -p "$MODULE_PATH/validators"
mkdir -p "$REPO_PATH"

# --- DTOs ---
# Create DTO
cat > "$MODULE_PATH/dto/create-$MODULE_NAME.dto.ts" <<EOF
import { IsNotEmpty } from 'class-validator';

export class Create${MODULE_PASCAL}Dto {

}
EOF

# Update DTO
cat > "$MODULE_PATH/dto/update-$MODULE_NAME.dto.ts" <<EOF
import { PartialType } from '@nestjs/mapped-types';
import { Create${MODULE_PASCAL}Dto } from './create-$MODULE_NAME.dto';

export class Update${MODULE_PASCAL}Dto extends PartialType(Create${MODULE_PASCAL}Dto) {}
EOF

# Get DTO
cat > "$MODULE_PATH/dto/get-$MODULE_NAME.dto.ts" <<EOF
import { IsOptional } from 'class-validator';
import { PaginationDto } from 'src/shared/dto/pagination.dto';


export class Get${MODULE_PASCAL}Dto extends PaginationDto {}
EOF

# --- Entity ---
cat > "$MODULE_PATH/entities/$MODULE_NAME.entity.ts" <<EOF
import { Base } from 'src/shared/entities/base-entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: '${MODULE_NAME//-/_}' })
export class ${MODULE_PASCAL} extends Base {
 
}
EOF

# --- Repository ---
cat > "$REPO_PATH/$MODULE_NAME.repository.ts" <<EOF
import { Injectable } from "@nestjs/common";
import { ${MODULE_PASCAL} } from "src/modules/$MODULE_NAME/entities/$MODULE_NAME.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class ${MODULE_PASCAL}Repository extends Repository<${MODULE_PASCAL}> {
  constructor(private dataSource: DataSource) {
    super(${MODULE_PASCAL}, dataSource.manager);
  }
}
EOF

# --- Provider ---
cat > "$REPO_PATH/$MODULE_NAME.provider.ts" <<EOF
import { DataSource } from 'typeorm';
import { ${MODULE_PASCAL}Repository } from './$MODULE_NAME.repository';

export const ${MODULE_CAMEL}Providers = [
  {
    provide: ${MODULE_PASCAL}Repository,
    useFactory: (dataSource: DataSource) => new ${MODULE_PASCAL}Repository(dataSource),
    inject: ['DATA_SOURCE'],
  },
];
EOF

# --- Use Cases ---

# Command: Create
cat > "$MODULE_PATH/use-cases/command/create-$MODULE_NAME.usecase.ts" <<EOF
import { Injectable } from "@nestjs/common";
import { Create${MODULE_PASCAL}Dto } from "../../dto/create-$MODULE_NAME.dto";
import { ${MODULE_PASCAL} } from "../../entities/$MODULE_NAME.entity";
import { ${MODULE_PASCAL}Repository } from "src/repositories/$MODULE_NAME/$MODULE_NAME.repository";

@Injectable()
export class Create${MODULE_PASCAL}UseCase {
  constructor(private readonly repository: ${MODULE_PASCAL}Repository) { }

  async execute(create${MODULE_PASCAL}Dto: Create${MODULE_PASCAL}Dto): Promise<${MODULE_PASCAL}> {
    return this.repository.save(create${MODULE_PASCAL}Dto);
  }
}
EOF

# Command: Update
cat > "$MODULE_PATH/use-cases/command/update-$MODULE_NAME.usecase.ts" <<EOF
import { BadRequestException, Injectable } from "@nestjs/common";
import { Update${MODULE_PASCAL}Dto } from "../../dto/update-$MODULE_NAME.dto";
import { ${MODULE_PASCAL} } from "../../entities/$MODULE_NAME.entity";
import { ${MODULE_PASCAL}Repository } from "src/repositories/$MODULE_NAME/$MODULE_NAME.repository";

@Injectable()
export class Update${MODULE_PASCAL}UseCase {
  constructor(private readonly repository: ${MODULE_PASCAL}Repository) { }

  async execute(id: string, update${MODULE_PASCAL}Dto: Update${MODULE_PASCAL}Dto): Promise<${MODULE_PASCAL}> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new BadRequestException('El registro no existe');
    this.repository.merge(entity, update${MODULE_PASCAL}Dto);
    return this.repository.save(entity);
  }
}
EOF

# Command: Remove
cat > "$MODULE_PATH/use-cases/command/remove-$MODULE_NAME.usecase.ts" <<EOF
import { BadRequestException, Injectable } from "@nestjs/common";
import { ${MODULE_PASCAL} } from "../../entities/$MODULE_NAME.entity";
import { ${MODULE_PASCAL}Repository } from "src/repositories/$MODULE_NAME/$MODULE_NAME.repository";

@Injectable()
export class Remove${MODULE_PASCAL}UseCase {
  constructor(private readonly repository: ${MODULE_PASCAL}Repository) { }

  async execute(id: string): Promise<{ message: string, data: ${MODULE_PASCAL} }> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new BadRequestException('El registro no existe');
    await this.repository.softDelete(id);
    return {
      message: 'Eliminado correctamente',
      data: entity
    }
  }
}
EOF

# Query: Find All
cat > "$MODULE_PATH/use-cases/query/find-all-$MODULE_NAME.usecase.ts" <<EOF
import { Injectable } from "@nestjs/common";
import { Get${MODULE_PASCAL}Dto } from "../../dto/get-$MODULE_NAME.dto";
import * as Pagination from 'src/utils/pagination';
import { ${MODULE_PASCAL}Repository } from "src/repositories/$MODULE_NAME/$MODULE_NAME.repository";

@Injectable()
export class FindAll${MODULE_PASCAL}UseCase {
  constructor(private readonly repository: ${MODULE_PASCAL}Repository) { }

  async execute(q: Get${MODULE_PASCAL}Dto) {
    const { page, limit } = q;
    const pagination = Pagination.query({ page, limit });
    const [rows, total] = await this.repository.findAndCount({
      ...pagination
    });

    return Pagination.get(rows, page, limit, total);
  }
}
EOF

# Query: Find One
cat > "$MODULE_PATH/use-cases/query/find-one-$MODULE_NAME.usecase.ts" <<EOF
import { Injectable, NotFoundException } from "@nestjs/common";
import { ${MODULE_PASCAL}Repository } from "src/repositories/$MODULE_NAME/$MODULE_NAME.repository";
import { ${MODULE_PASCAL} } from "../../entities/$MODULE_NAME.entity";

@Injectable()
export class FindOne${MODULE_PASCAL}UseCase {
  constructor(private readonly repository: ${MODULE_PASCAL}Repository) { }

  async execute(id: string): Promise<${MODULE_PASCAL}> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(\`Registro con ID \${id} no encontrado\`);
    }
    return entity;
  }
}
EOF

# --- Service ---
cat > "$MODULE_PATH/$MODULE_NAME.service.ts" <<EOF
import { Injectable } from '@nestjs/common';
import { Create${MODULE_PASCAL}Dto } from './dto/create-$MODULE_NAME.dto';
import { Update${MODULE_PASCAL}Dto } from './dto/update-$MODULE_NAME.dto';
import { Get${MODULE_PASCAL}Dto } from './dto/get-$MODULE_NAME.dto';
import { Create${MODULE_PASCAL}UseCase } from './use-cases/command/create-$MODULE_NAME.usecase';
import { Update${MODULE_PASCAL}UseCase } from './use-cases/command/update-$MODULE_NAME.usecase';
import { Remove${MODULE_PASCAL}UseCase } from './use-cases/command/remove-$MODULE_NAME.usecase';
import { FindAll${MODULE_PASCAL}UseCase } from './use-cases/query/find-all-$MODULE_NAME.usecase';
import { FindOne${MODULE_PASCAL}UseCase } from './use-cases/query/find-one-$MODULE_NAME.usecase';

@Injectable()
export class ${MODULE_PASCAL}Service {
  constructor(
    private readonly createUseCase: Create${MODULE_PASCAL}UseCase,
    private readonly updateUseCase: Update${MODULE_PASCAL}UseCase,
    private readonly removeUseCase: Remove${MODULE_PASCAL}UseCase,
    private readonly findAllUseCase: FindAll${MODULE_PASCAL}UseCase,
    private readonly findOneUseCase: FindOne${MODULE_PASCAL}UseCase,
  ) {}

  create(create${MODULE_PASCAL}Dto: Create${MODULE_PASCAL}Dto) {
    return this.createUseCase.execute(create${MODULE_PASCAL}Dto);
  }

  findAll(query: Get${MODULE_PASCAL}Dto) {
    return this.findAllUseCase.execute(query);
  }

  findOne(id: string) {
    return this.findOneUseCase.execute(id);
  }

  update(id: string, update${MODULE_PASCAL}Dto: Update${MODULE_PASCAL}Dto) {
    return this.updateUseCase.execute(id, update${MODULE_PASCAL}Dto);
  }

  remove(id: string) {
    return this.removeUseCase.execute(id);
  }
}
EOF

# --- Controller ---
cat > "$MODULE_PATH/$MODULE_NAME.controller.ts" <<EOF
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ${MODULE_PASCAL}Service } from './$MODULE_NAME.service';
import { Create${MODULE_PASCAL}Dto } from './dto/create-$MODULE_NAME.dto';
import { Update${MODULE_PASCAL}Dto } from './dto/update-$MODULE_NAME.dto';
import { Get${MODULE_PASCAL}Dto } from './dto/get-$MODULE_NAME.dto';

@Controller('$MODULE_NAME')
export class ${MODULE_PASCAL}Controller {
  constructor(private readonly ${MODULE_CAMEL}Service: ${MODULE_PASCAL}Service) {}

  @Post()
  create(@Body() create${MODULE_PASCAL}Dto: Create${MODULE_PASCAL}Dto) {
    return this.${MODULE_CAMEL}Service.create(create${MODULE_PASCAL}Dto);
  }

  @Get()
  findAll(@Query() query: Get${MODULE_PASCAL}Dto) {
    return this.${MODULE_CAMEL}Service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.${MODULE_CAMEL}Service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() update${MODULE_PASCAL}Dto: Update${MODULE_PASCAL}Dto) {
    return this.${MODULE_CAMEL}Service.update(id, update${MODULE_PASCAL}Dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.${MODULE_CAMEL}Service.remove(id);
  }
}
EOF

# --- Module ---
cat > "$MODULE_PATH/$MODULE_NAME.module.ts" <<EOF
import { Module } from '@nestjs/common';
import { ${MODULE_PASCAL}Service } from './$MODULE_NAME.service';
import { ${MODULE_PASCAL}Controller } from './$MODULE_NAME.controller';
import { DatabaseModule } from '../../database/database.module';
import { Create${MODULE_PASCAL}UseCase } from './use-cases/command/create-$MODULE_NAME.usecase';
import { Update${MODULE_PASCAL}UseCase } from './use-cases/command/update-$MODULE_NAME.usecase';
import { Remove${MODULE_PASCAL}UseCase } from './use-cases/command/remove-$MODULE_NAME.usecase';
import { FindAll${MODULE_PASCAL}UseCase } from './use-cases/query/find-all-$MODULE_NAME.usecase';
import { FindOne${MODULE_PASCAL}UseCase } from './use-cases/query/find-one-$MODULE_NAME.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [${MODULE_PASCAL}Controller],
  providers: [
    ${MODULE_PASCAL}Service,
    Create${MODULE_PASCAL}UseCase,
    Update${MODULE_PASCAL}UseCase,
    Remove${MODULE_PASCAL}UseCase,
    FindAll${MODULE_PASCAL}UseCase,
    FindOne${MODULE_PASCAL}UseCase,
  ],
})
export class ${MODULE_PASCAL}Module {}
EOF

# --- Register Module in src/modules.ts ---
MODULES_FILE="src/modules.ts"
if [ -f "$MODULES_FILE" ]; then
    # Add import
    sed -i '' "1i\\
import { ${MODULE_PASCAL}Module } from \"./modules/$MODULE_NAME/$MODULE_NAME.module\";
" "$MODULES_FILE"
    
    # Add to array
    sed -i '' "/export const APP_MODULES = \[/a\\
  ${MODULE_PASCAL}Module,
" "$MODULES_FILE"
    echo "Updated $MODULES_FILE"
else
    echo "Warning: $MODULES_FILE not found. Skipping module registration."
fi

# --- Register Provider in src/repositories/providers.ts ---
PROVIDERS_FILE="src/repositories/providers.ts"
if [ -f "$PROVIDERS_FILE" ]; then
    # Add import
    sed -i '' "1i\\
import { ${MODULE_CAMEL}Providers } from \"./$MODULE_NAME/$MODULE_NAME.provider\";
" "$PROVIDERS_FILE"
    
    # Add to array
    sed -i '' "/export const repositoriesProviders = \[/a\\
  ...${MODULE_CAMEL}Providers,
" "$PROVIDERS_FILE"
    echo "Updated $PROVIDERS_FILE"
else
    echo "Warning: $PROVIDERS_FILE not found. Skipping provider registration."
fi

echo "Done! Module $MODULE_NAME created successfully."
