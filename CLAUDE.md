# fanout

pnpm + Turborepo monorepo. Every package lives under `packages/` and is scoped `@fanout/*`.

## Packages

- `web`: the frontend.
- `api`: the backend.
- `shared`: the home for any module both `web` and `api` need (types, schemas, pure logic). `web` and `api` depend on `shared`, and never on each other.
- `eslint-config`, `typescript-config`: tooling presets that every other package extends.

## Conventions

- Run tasks from the root so Turborepo orchestrates them across packages; root `package.json` lists the tasks.
- Declare dependency versions shared by more than one package in the `catalog` in `pnpm-workspace.yaml`, and reference them with `catalog:`.
