import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import "server-only";
import Links from "./client/Links";
import type { ContentProps } from "./props";

export default function NavbarContent(props: ContentProps): JSX.Element {
  const t = useTranslations("Navbar");

  return (
    <nav className="navbar sticky top-0 z-40 mb-2 bg-base-100 px-4">
      <div className="flex-1">
        <Link className="btn btn-ghost" href="/en">
          <h1>{t("title")}</h1>
        </Link>
      </div>
      <Links initialFriendRequestsCount={props.initialFriendRequestsCount} />
    </nav>
  );
}
