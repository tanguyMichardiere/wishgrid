#!/usr/bin/env sh

# TODO: remove sharp once it works
EXCLUDE="@types/node,sharp"

pnpm exec npm-check-updates -x "$EXCLUDE" -u
pnpm install
pnpm update
