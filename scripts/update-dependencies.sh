#!/usr/bin/env sh
npx -y npm-check-updates -t minor -u
npx -y npm-check-updates -f !@types/node -u
npm install
npm update
