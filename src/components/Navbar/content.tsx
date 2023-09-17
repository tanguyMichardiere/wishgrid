import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import "server-only";
import type { Props as LinksProps } from "./client/Links";
import Links from "./client/Links";

type Props = Pick<LinksProps, "initialFriendRequestsCount">;

export default function NavbarContent(props: Props): JSX.Element {
  const t = useTranslations("Navbar");

  return (
    <nav className="navbar sticky top-0 z-40 mb-2 bg-base-100 px-4">
      <div className="flex-1">
        <Link className="btn btn-ghost" href="/en">
          <h1>{t("title")}</h1>
        </Link>
      </div>
      <Links
        friendRequests={t("Links.friend-requests")}
        friends={t("Links.friends")}
        initialFriendRequestsCount={props.initialFriendRequestsCount}
        myWishes={t("Links.myWishes")}
        search={t("Links.search")}
        settings={t("Links.settings")}
      />
    </nav>
  );
}
