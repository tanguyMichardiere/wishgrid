import { Analytics } from "@vercel/analytics/react";
import type { ReactNode } from "react";
import "../styles.css";

export const metadata = {
  title: "WishGrid",
  description: "Personal wishlists",
  icons: [
    "/favicon.ico",
    { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
    { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    { url: "/favicon-96.png", type: "image/png", sizes: "96x96" },
  ],
};

type Props = {
  children: ReactNode;
};

export default function RootLayout(props: Props): JSX.Element {
  return (
    <>
      <Analytics />
      {props.children}
    </>
  );
}
