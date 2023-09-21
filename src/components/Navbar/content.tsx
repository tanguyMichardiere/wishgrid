import Link from "next-intl/link";
import { useServerTranslations } from "../../utils/translations/server";
import type { Props as LinksProps } from "./client/Links";
import Links from "./client/Links";

type Props = Pick<LinksProps, "initialFriendRequestsCount">;

export default function NavbarContent(props: Props): JSX.Element {
  const t = useServerTranslations("Navbar");

  return (
    <>
      <div className="flex-1">
        <Link className="btn btn-ghost" href="/">
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
    </>
  );
}
