"use client";

import { useAcceptFriendRequestMutation } from "../hooks/mutations/friendRequests/accept";
import { useClientTranslations } from "../utils/translations/client";
import MutationButton from "./MutationButton";

type Props = {
  userId: string;
};

export default function AcceptFriendRequestButton(props: Props): JSX.Element {
  const t = useClientTranslations("clientComponents.AcceptFriendRequestButton");

  const acceptFriendRequest = useAcceptFriendRequestMutation();

  return (
    <MutationButton
      className="btn-primary"
      mutation={acceptFriendRequest}
      variables={{ userId: props.userId }}
    >
      {t("text")}
    </MutationButton>
  );
}
