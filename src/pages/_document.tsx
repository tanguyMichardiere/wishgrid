import { Head, Html, Main, NextScript } from "next/document";

import { NEXT_PUBLIC_DESCRIPTION, NEXT_PUBLIC_TITLE } from "../env/client";

/* eslint-disable react/no-invalid-html-attribute */
/* eslint-disable react/jsx-sort-props */

// apple splash screen images
const sizes: Array<[number, number]> = [
  [2048, 2732],
  [1668, 2224],
  [1536, 2048],
  [1125, 2436],
  [1242, 2208],
  [750, 1334],
  [640, 1136],
];
const links = sizes.map(([width, height]) => (
  <link
    key={width}
    rel="apple-touch-startup-image"
    href={`/images/apple_splash_${width}.png`}
    sizes={`${width}x${height}`}
  />
));

export default function Document(): JSX.Element {
  return (
    <Html lang="en">
      <Head>
        <meta name="application-name" content={NEXT_PUBLIC_TITLE} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={NEXT_PUBLIC_TITLE} />
        <meta name="description" content={NEXT_PUBLIC_DESCRIPTION} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {links}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
