# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server with auto-reload (uses Node.js --watch)
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code using Prettier
- `npm run format:check` - Check code formatting without changes

### Database Operations
- `npm run db:generate` - Generate Drizzle database migrations from schema changes
- `npm run db:migrate` - Apply pending migrations to database
- `npm run db:studio` - Launch Drizzle Studio for database management

## Architecture Overview

This is a Node.js REST API using modern ES modules with Express.js and Drizzle ORM for PostgreSQL (Neon database).

### Application Structure
The codebase follows a layered architecture pattern:

**Entry Points:**
- `src/index.js` - Main entry point that loads environment variables and starts server
- `src/server.js` - HTTP server configuration and startup
- `src/app.js` - Express application setup with middleware and route configuration

**Core Layers:**
- **Controllers** (`src/controllers/`) - Handle HTTP requests/responses and validation
- **Services** (`src/services/`) - Business logic layer, database interactions
- **Models** (`src/models/`) - Drizzle ORM schema definitions (PostgreSQL)
- **Routes** (`src/routes/`) - Express route definitions and middleware setup
- **Validations** (`src/validations/`) - Zod schema validation definitions
- **Utils** (`src/utils/`) - Shared utilities (JWT, cookies, formatting)
- **Config** (`src/config/`) - Configuration for database connection and logging

### Key Architectural Patterns

**Import Path Aliases:** The project uses Node.js subpath imports for clean imports:
```javascript
import logger from '#config/logger.js';
import { createUser } from '#services/auth.service.js';
```

**Database Layer:** Uses Drizzle ORM with Neon serverless PostgreSQL:
- Schema-first approach with type-safe queries
- Migrations managed through `drizzle-kit`
- Connection pooling via Neon's serverless driver

**Validation Layer:** Zod schemas provide runtime type validation:
- Input validation in controllers before processing
- Type-safe data transformation and parsing
- Detailed error formatting for API responses

**Authentication Flow:** JWT-based authentication with HTTP-only cookies:
- Password hashing with bcrypt (10 rounds)
- JWT tokens stored in secure cookies
- Role-based access control (user/admin roles)

**Logging:** Structured logging with Winston:
- File logging for errors and combined logs
- Console logging in development
- Request logging through Morgan middleware

### Environment Setup

Copy `.env.example` to `.env` and configure:
- `DATABASE_URL` - Neon PostgreSQL connection string
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `LOG_LEVEL` - Winston log level (default: info)

### Code Style
- ESLint configuration enforces modern JavaScript standards
- Prettier handles code formatting with single quotes and 2-space indentation
- ES modules throughout (type: "module" in package.json)