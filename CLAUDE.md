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

## Agent skills

### Issue tracker

Issues live in GitHub Issues on `the-kwisatz-haderach/fanout`, used through the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one root `GLOSSARY.md` and `docs/adr/`, covering every package. See `docs/agents/domain.md`.
