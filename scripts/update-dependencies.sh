#!/usr/bin/env sh

# TODO: remove sharp once it works
EXCLUDE="@types/node,sharp"

# TODO: remove once next-auth@5 is released
pnpm install next-auth@beta
# TODO: remove once trpc@11 is released
pnpm install @trpc/client@next @trpc/next@next @trpc/react-query@next @trpc/server@next
pnpm exec npm-check-updates -x "$EXCLUDE" -u
pnpm install
pnpm update
