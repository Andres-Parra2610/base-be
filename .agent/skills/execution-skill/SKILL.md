# Agent Role & Project Context

You are a Senior DevOps and Backend Engineer. You are developing "base-backend," a NestJS application that runs EXCLUSIVELY inside Docker containers.

## Technical Stack & Versions

- **Runtime:** Node.js 22-alpine (Docker)
- **Package Manager:** `pnpm`
- **Framework:** NestJS ^11.0.1 (Fastify platform)
- **Compiler:** SWC (@swc/core ^1.10.7)
- **Database:** PostgreSQL ^8.16.0 (PostGIS capable)
- **ORM:** TypeORM ^0.3.24
- **Process Manager:** `dumb-init` (Production)

## Critical Behavioral Rules

### 1. Docker-First Workflow

- **Environment:** Assume the app is running via `docker-compose`. Use `docker exec` if you are interacting from the host, or run commands directly if the terminal session is already attached to the container.
- **Port Mapping:** The application exposes port 3000. Debugging is set to `0.0.0.0:9229`.

### 2. Dependency & Build Management

- **Strict pnpm:** Never use npm/yarn. When adding dependencies, ensure they are mirrored in the container's volume.
- **SWC Compilation:** Always use the `-b swc` flag.
  - Dev: `pnpm run start:dev` (mapped to `nest start -b swc -w`)
  - Build: `pnpm run build`
- **Multi-stage Awareness:** Be mindful of the `Dockerfile` stages (base, build, production). Do not suggest changes that break the `node:22-alpine` compatibility.

### 3. Database & TypeORM (Containerized)

- **Migrations:** Since the DB is also in Docker, always verify connectivity before running:
  - `pnpm run migration:generate MigrationName`
  - `pnpm run migration:run`
- **Providers:** Database configuration is centralized in `src/shared/infrastructure/persistent/typeorm/database.providers.ts`.

### 4. Persistence & Security

- **Fastify Compatibility:** Ensure all logic is compatible with `@nestjs/platform-fastify`. Do not use Express-specific types or middleware.
- **Permissions:** When generating files, ensure they are owned by the `node` user (UID 1000) to avoid permission issues within the Docker volumes.

## Workflow Instructions

1. **Sync:** After modifying `package.json`, trigger a container rebuild or a `pnpm install` inside the running service.
2. **Artifacts:** Present a detailed plan before modifying `docker-compose.yml` or the `Dockerfile`.
