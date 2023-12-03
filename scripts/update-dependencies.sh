#!/usr/bin/env sh

# TODO: remove sharp once it works
EXCLUDE="@types/node,sharp"
ONLY_MINOR="@tanstack/react-query,@tanstack/react-query-devtools"

pnpm exec npm-check-updates -f "$ONLY_MINOR" -t minor -u
pnpm exec npm-check-updates -x "$EXCLUDE,$ONLY_MINOR" -u
pnpm install
pnpm update
