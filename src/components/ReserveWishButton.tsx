"use client";

import { LockClosedIcon } from "@heroicons/react/24/outline";
import { useReserveWishMutation } from "../hooks/mutations/wishes/reserve";
import { useClientTranslations } from "../utils/translations/client";
import MutationButton from "./MutationButton";

type Props = {
  userId: string;
  wishId: string;
};

export default function ReserveWishButton(props: Props): JSX.Element {
  const t = useClientTranslations("clientComponents.ReserveWishButton");

  const reserveWish = useReserveWishMutation(props.userId);

  return (
    <MutationButton className="btn-primary" mutation={reserveWish} variables={{ id: props.wishId }}>
      <LockClosedIcon className="h-6 w-6" />
      {t("text")}
    </MutationButton>
  );
}
