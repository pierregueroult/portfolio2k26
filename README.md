# Portfolio 2k26

This is a monorepo for the Portfolio 2k26 project, managed with [Turborepo](https://turbo.build/repo).

## Project Structure

- **apps/portfolio**: The frontend application built with Next.js.
- **apps/main-api**: The backend API built with NestJS.
- **packages/**: Shared packages (ui, database, config, etc.).

## Getting Started

### Prerequisites

- Node.js (>= 20)
- pnpm (>= 9)

### Installation

```bash
pnpm install
```

### Development

To start the development server for all apps:

```bash
pnpm dev
```

### Building

To build all apps and packages:

```bash
pnpm build
```

### Linting

To lint all apps and packages:

```bash
pnpm lint
```
