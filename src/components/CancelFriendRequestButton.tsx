"use client";

import { useCancelFriendRequestMutation } from "../hooks/mutations/friendRequests/cancel";
import { useClientTranslations } from "../utils/translations/client";
import MutationButton from "./MutationButton";

type Props = {
  userId: string;
};

export default function CancelFriendRequestButton(props: Props): JSX.Element {
  const t = useClientTranslations("client.CancelFriendRequestButton");

  const cancelFriendRequest = useCancelFriendRequestMutation();

  return (
    <MutationButton mutation={cancelFriendRequest} variables={{ userId: props.userId }}>
      {t("text")}
    </MutationButton>
  );
}
