# Architecture Documentation & Review

This document provides a detailed overview of the project's architecture, which follows **Hexagonal Architecture (Ports & Adapters)** combined with **Vertical Slicing** and **CQRS-lite Repository Segregation**.

## 1. High-Level Architecture

The application is structured to decouple the business logic (Domain) from the external details (Infrastructure). It uses **Vertical Slicing** to group related code by feature (Module) rather than by technical layer. Additionally, persistence layers separate command (write/generic) actions from query (read/search) actions.

### Key Concepts

- **Vertical Slicing**: Each feature (e.g., `User`, `HealthCheck`) is a self-contained module in `src/modules`. It contains its own Domain, Application, and Infrastructure layers.
- **Hexagonal Architecture**: Within each module, code is organized into concentric layers:
  - **Domain (Center)**: The core business logic and entities. Independent of everything else.
  - **Application (Wrapping Domain)**: Orchestrates the Domain objects to perform specific user tasks (Use Cases).
  - **Infrastructure (Outer Edge)**: Adapters that interface with the outside world (HTTP Controllers, Database Repositories).
- **CQRS-lite Repository Segregation**: Within the persistence boundary, there are dedicated **Repositories** (Command) and **Query Repositories** (Query). The standard Repository handles inserts, updates, deletes, and basic ID-based reads. The Query Repository strictly handles advanced reads like filtering, sorting, and pagination.

---

## 2. Directory Structure

### Root `src`

```text
src/
├── core/           # Global core functionality (Logger, Interceptors, Filters)
├── modules/        # Vertical Slices (Feature Modules)
├── shared/         # Shared Kernel (Common Domain & Infrastructure)
├── config/         # Configuration setups
├── main.ts         # Application Entry Point
└── modules.ts      # Aggregator for all application modules
```

### Module Structure (e.g., `src/modules/user`)

Each module follows the Hexagonal pattern strictly:

```text
src/modules/user/
├── domain/                  # The INNERMOST layer (No external dependencies)
│   ├── models/              # Pure Domain Entities (e.g., User Model)
│   ├── ports/               # Interfaces defining contracts for Infrastructure
│   │   ├── user-repository.port.ts         # Command port
│   │   └── user-query-repository.port.ts   # Query port
│   └── exceptions/          # Domain-specific exceptions
│
├── application/             # The APPLICATION layer (Depends on Domain)
│   ├── use-cases/           # Application Services (e.g., CreateUserUseCase)
│   └── interfaces/          # Application-level interfaces
│
└── infrastructure/          # The OUTERMOST layer (Adapters)
    ├── http/                # Driving Adapters (Controllers, DTOs)
    └── persistence/         # Driven Adapters (Repositories, TypeORM Entities)
```

---

## 3. Detailed Layer Analysis

### A. Domain Layer (`src/modules/*/domain`)

- **Purpose**: Represents the business concepts and rules.
- **Contents**:
  - **Models**: Plain TypeScript classes acting as entities. They should **not** have database decorators (like `@Entity` or `@Column`) to keep them pure.
  - **Ports**: Interfaces that define _how_ the application interacts with external tools (like databases). The Domain _defines_ the port, but the Infrastructure _implements_ it. As noted, these are split by Command and Query responsibilities.
- **Rules**: DEPENDS ON NOTHING.

### B. Application Layer (`src/modules/*/application`)

- **Purpose**: Implements the specific actions a user can perform.
- **Contents**:
  - **Use Cases**: Classes containing the logic for a specific operation. They receive input, interact with the Domain, and use Ports to save/retrieve data.
    - Write use cases will typically inject the standard `Repository` port.
    - Read use cases (like `find-all-*.usecase.ts`) will inject the specialized `QueryRepository` port.
- **Rules**: Depends only on **Domain**.

### C. Infrastructure Layer (`src/modules/*/infrastructure`)

- **Purpose**: Provides the concrete implementations for the application to work with the real world.
- **Contents**:
  - **HTTP**: NestJS Controllers and DTOs (Data Transfer Objects). They handle incoming network requests and translate them into Use Case calls.
  - **Persistence**:
    - **Repositories**: Implementation of the Domain Ports.
    - **Entities**: Database-specific schemas (TypeORM classes).
    - **Mappers**: Functions to convert between Domain Models and Persistence Entities.
- **Rules**: Depends on **Domain** and **Application**.

---

## 4. Shared Kernel & Dependency Injection (`src/shared`)

Code that is truly common across multiple modules lives here, including the unified strategy for injecting repositories deeply across slices.

- `src/shared/domain`: Base classes for entities, value objects, or common domain logic.
- `src/shared/infrastructure/repositories`: Houses the **Global Repository Registration**.
  - `names.repositories.ts`: **Single Source of Truth** for all repository injection tokens (e.g., `USER_REPOSITORY`, `USER_QUERY_REPOSITORY`). Always use `REPO_NAME.*` to inject a repository port into a use case.
  - `repositories.module.ts`: A `@Global()` module that globally provides all concrete repository classes bound to their `REPO_NAME` tokens. This eliminates the need to import feature module databases throughout the app while safely avoiding circular dependencies.
