"use client";

import { forwardRef, useState } from "react";
import { useDeleteWishMutation } from "../hooks/mutations/wishes/delete";
import { setRef } from "../utils/refs";
import { useClientTranslations } from "../utils/translations/client";
import MutationButton from "./MutationButton";

type Props = {
  wishId: string;
};

export default forwardRef<{ reset: () => void }, Props>(function DeleteWishButton(props, ref) {
  const t = useClientTranslations("client.DeleteWishButton");

  const [confirming, setConfirming] = useState(false);
  const [canConfirm, setCanConfirm] = useState(false);

  function startConfirming() {
    setConfirming(true);
    setTimeout(function () {
      setCanConfirm(true);
    }, 1000);
  }

  setRef(ref, {
    reset() {
      setConfirming(false);
      setCanConfirm(false);
    },
  });

  const deleteWish = useDeleteWishMutation();

  if (confirming) {
    return (
      <MutationButton
        className="btn-error"
        disabled={!canConfirm}
        mutation={deleteWish}
        variables={{ id: props.wishId }}
      >
        {t("confirmationText")}
      </MutationButton>
    );
  }

  return (
    <button className="btn btn-error" onClick={startConfirming} type="button">
      {t("text")}
    </button>
  );
});
