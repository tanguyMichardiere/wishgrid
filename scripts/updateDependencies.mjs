#!/usr/bin/env npx zx
import { $ } from "zx";

await $`npx -y npm-check-updates -t minor -u`;
await $`npx -y npm-check-updates -f !@types/node -u`;
await $`npm install`;
