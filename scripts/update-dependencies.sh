#!/usr/bin/env sh
ONLY_MINOR="@types/node,@tanstack/react-query,@tanstack/react-query-devtools"
npx npm-check-updates -f $ONLY_MINOR -t minor -u
npx npm-check-updates -x $ONLY_MINOR -u
npm install
npm update
