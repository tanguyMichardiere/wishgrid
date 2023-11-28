#!/usr/bin/env sh
EXCLUDE="@types/node"
ONLY_MINOR="@tanstack/react-query,@tanstack/react-query-devtools"
pnpm exec npm-check-updates -f "$ONLY_MINOR" -t minor -u
pnpm exec npm-check-updates -x "$EXCLUDE,$ONLY_MINOR" -u
pnpm install
pnpm update
