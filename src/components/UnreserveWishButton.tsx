"use client";

import { LockOpenIcon } from "@heroicons/react/24/outline";
import type { JSX } from "react";
import { useUnreserveWishMutation } from "../hooks/mutations/wishes/unreserve";
import { useClientTranslations } from "../utils/translations/client";
import MutationButton from "./MutationButton";

type Props = {
  userId: string;
  wishId: string;
};

export default function UnreserveWishButton(props: Props): JSX.Element {
  const t = useClientTranslations("client.UnreserveWishButton");

  const unreserveWish = useUnreserveWishMutation(props.userId);

  return (
    <MutationButton
      className="btn-primary"
      mutation={unreserveWish}
      variables={{ id: props.wishId }}
    >
      <LockOpenIcon className="h-6 w-6" />
      {t("text")}
    </MutationButton>
  );
}
