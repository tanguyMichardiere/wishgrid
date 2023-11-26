#!/usr/bin/env sh
ONLY_MINOR="@types/node,@tanstack/react-query,@tanstack/react-query-devtools"
pnpx npm-check-updates -f $ONLY_MINOR -t minor -u
pnpx npm-check-updates -x $ONLY_MINOR -u
pnpm install
pnpm update
