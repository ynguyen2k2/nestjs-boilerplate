#!/usr/bin/env bash
set -e

/opt/wait-for-it.sh postgres:5432
pnpm install
pnpm run migration:run
pnpm run start:prod