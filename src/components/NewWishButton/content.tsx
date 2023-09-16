import { useTranslations } from "next-intl";
import type { User } from "../../server/db/types/user";
import NewWishButtonClient from "./client";

export type ContentProps = {
  initialCurrentUser: User;
};

export default function NewWishButtonContent(props: ContentProps): JSX.Element {
  const t = useTranslations("NewWishButton");

  return <NewWishButtonClient initialCurrentUser={props.initialCurrentUser} text={t("text")} />;
}
