"use client";

import type { JSX } from "react";
import { useDeclineFriendRequestMutation } from "../hooks/mutations/friendRequests/decline";
import { useClientTranslations } from "../utils/translations/client";
import MutationButton from "./MutationButton";

type Props = {
  userId: string;
};

export default function DeclineFriendRequestButton(props: Props): JSX.Element {
  const t = useClientTranslations("client.DeclineFriendRequestButton");

  const declineFriendRequest = useDeclineFriendRequestMutation();

  return (
    <MutationButton
      className="btn-ghost"
      mutation={declineFriendRequest}
      variables={{ userId: props.userId }}
    >
      {t("text")}
    </MutationButton>
  );
}
