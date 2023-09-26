import cx from "classix";
import Link from "next/link";
import { variable } from "./font";

export default function NotFound(): JSX.Element {
  return (
    <html lang="en">
      <body className={cx(variable, "font-sans")}>
        <div className="flex flex-col items-center gap-4 pt-48">
          <h2 className="text-center">Page Not Found</h2>
          <Link className="link" href="/">
            Return to Home Page
          </Link>
        </div>
      </body>
    </html>
  );
}
