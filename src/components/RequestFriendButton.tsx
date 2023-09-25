"use client";

import { useCreateFriendRequestMutation } from "../hooks/mutations/friendRequests/create";
import { useClientTranslations } from "../utils/translations/client";
import MutationButton from "./MutationButton";

type Props = {
  userId: string;
};

export default function RequestFriendButton(props: Props): JSX.Element {
  const t = useClientTranslations("clientComponents.RequestFriendButton");

  const createFriendRequest = useCreateFriendRequestMutation();

  return (
    <MutationButton mutation={createFriendRequest} variables={{ userId: props.userId }}>
      {t("text")}
    </MutationButton>
  );
}
