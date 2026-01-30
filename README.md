# Base Backend Project

<div align="center">

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0C2F.svg?style=for-the-badge&logo=TypeORM&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![SWC](https://img.shields.io/badge/SWC-FFFFFF?style=for-the-badge&logo=swc&logoColor=F5D00E)
![pnpm](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)

</div>

A production-ready, highly scalable backend starter template built with **NestJS**, **Fastify**, and **PostgreSQL**.

This project is architected with **Hexagonal Architecture (Ports and Adapters)** and **Vertical Slicing** to ensure maintainability, testability, and separation of concerns. It is designed to run **exclusively inside Docker containers**, ensuring a consistent environment from development to production.

## 🚀 Tech Stack

- **Runtime**: Node.js 22 (Alpine)
- **Framework**: [NestJS 11](https://nestjs.com/)
- **HTTP Adapter**: [Fastify](https://www.fastify.io/) (High performance)
- **Language**: TypeScript
- **Database**: PostgreSQL 17 + PostGIS
- **ORM**: [TypeORM](https://typeorm.io/)
- **Compiler**: [SWC](https://swc.rs/) (Speedy Web Compiler for fast builds)
- **Containerization**: Docker & Docker Compose
- **Package Manager**: `pnpm` (Strictly required)

## 🏗 Architecture

This project follows **Hexagonal Architecture** combined with **Vertical Slicing**.

### Directory Structure

```text
src/
├── modules/                # Vertical Slices (Feature Modules)
│   └── [feature-name]/     # E.g., 'user', 'product'
│       ├── application/    # Use Cases & Interfaces
│       ├── domain/         # Models, Ports, Exceptions (Pure Business Logic)
│       └── infrastucture/  # Adapters (HTTP Controllers, Repositories, Entities)
├── shared/                 # Shared Kernel (Common Logic & Config)
└── main.ts                 # Entry Point
```

- **Domain**: The heart of the application. Contains business logic and is independent of frameworks or databases.
- **Application**: Orchestrates the domain to perform specific user actions (Use Cases).
- **Infrastructure**: Connects the application to the outside world (DB, HTTP, External APIs).

## 🛠 Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.
- **No local Node.js or PostgreSQL required** (everything runs in containers).

## ⚡️ Development Setup

1.  **Duplicate environment file**:

    ```bash
    cp .env.example .env
    ```

2.  **Start the environment**:
    Use the local Docker Compose file to start the backend and database.

    ```bash
    docker compose -f compose.local.yml up --build
    ```

    - The API will be available at: `http://localhost:3000`
    - Debugger is attached at: `0.0.0.0:9229`

## 🗄 Database & Migrations

Database changes are managed via **TypeORM Migrations**.

### Generate a Migration

To generate a migration based on your entity changes:

```bash
pnpm run migration:generate <MigrationName>
# Example: pnpm run migration:generate CreateUserTable
```

### Run Migrations

Apply pending migrations to the database:

```bash
pnpm run migration:run
```

### Revert Migrations

Undo the last applied migration:

```bash
pnpm run migration:revert
```

### Create Empty Migration

If you need to write raw SQL manually:

```bash
pnpm run migration:create <MigrationName>
```

### Seeding Data

Populate the database with initial data:

```bash
pnpm run seed
```

## 🧩 Feature Generation (Scaffolding)

Don't waste time writing boilerplate. Use the included generator script to create new modules that strictly follow the Hexagonal Architecture.

```bash
pnpm run generate:module <module-name>
# Example: pnpm run generate:module product-category
```

This will create:

- `src/modules/product-category/`
- Full directory structure (Domain, Application, Infrastructure)
- CRUD Use Cases & Interfaces
- Controllers & DTOs
- Repository & Entities
- Module definition

## 🧪 Testing

```bash
# Unit Tests
pnpm run test

# Watch Mode
pnpm run test:watch

# Coverage
pnpm run test:cov

# E2E Tests
pnpm run test:e2e
```

## 📝 Code Style

- **Linting**: ESLint
- **Formatting**: Prettier
- **Commit/Build**: Uses SWC for lightning-fast compilation.

To format code manually:

```bash
pnpm run format
```

## 🐳 Docker Commands Cheatsheet

| Action           | Command                                          |
| :--------------- | :----------------------------------------------- |
| **Start Dev**    | `docker compose -f compose.local.yml up`         |
| **Rebuild**      | `docker compose -f compose.local.yml up --build` |
| **Stop**         | `docker compose -f compose.local.yml down`       |
| **Shell Access** | `docker exec -it base-backend sh`                |
| **View Logs**    | `docker logs -f base-backend`                    |
