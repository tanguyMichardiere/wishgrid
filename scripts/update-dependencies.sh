#!/usr/bin/env sh

ONLY_MINOR="@types/node"

# TODO: remove once next-auth@5 is released
pnpm install next-auth@beta
# TODO: remove once trpc@11 is released
pnpm install @trpc/client@next @trpc/next@next @trpc/react-query@next @trpc/server@next
# TODO: remove once react@19 is released
pnpm install react@rc react-dom@rc
pnpm exec npm-check-updates -f "$ONLY_MINOR" -t minor -u
pnpm exec npm-check-updates -x "$ONLY_MINOR" -u
pnpm install
pnpm update
biome format --write package.json
