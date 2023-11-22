"use client";

import { ShareIcon } from "@heroicons/react/24/outline";
import { toast } from "../utils/toast";
import { useClientTranslations } from "../utils/translations/client";

type Props = {
  id: string;
};

export default function CopyUserLinkButton(props: Props): JSX.Element {
  const t = useClientTranslations("client.CopyUserLinkButton");

  const url = new URL(`/user/${props.id}`, location.href).href;

  function copyLink() {
    void navigator.clipboard.writeText(url).then(function () {
      toast.success(t("toastMessage"));
    });
  }

  const canShare =
    navigator.share instanceof Function &&
    navigator.canShare instanceof Function &&
    navigator.canShare({ url });

  function shareLink() {
    navigator.share({ url }).catch(function () {
      // probably just cancelled
    });
  }

  return (
    <div className="tooltip flex gap-2 self-center" data-tip={t("tooltip")}>
      <button className="btn" onClick={copyLink}>
        {t("buttonText")}
      </button>
      {canShare && (
        <button className="btn" onClick={shareLink}>
          <ShareIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
