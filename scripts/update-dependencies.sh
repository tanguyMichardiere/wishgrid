#!/usr/bin/env sh
npx -y npm-check-updates -x @next/bundle-analyzer -x eslint-config-next -x next -t minor -u
npx -y npm-check-updates -x @types/node -x @next/bundle-analyzer -x eslint-config-next -x next -u
npm install
npm update
