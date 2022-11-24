#!/usr/bin/env npx zx
import { $, cd, fs } from "zx";

await fs.mkdirp("public/images");
cd("public/images");

const sizes = [
  [2048, 2732],
  [1668, 2224],
  [1536, 2048],
  [1125, 2436],
  [1242, 2208],
  [750, 1334],
  [640, 1136],
];

await Promise.all(
  sizes.map(
    ([width, height]) => $`convert -size ${width}x${height} xc:"#000000" apple_splash_${width}.png`
  )
);
