"use client";

import { ClipboardDocumentIcon, ShareIcon } from "@heroicons/react/24/outline";
import { QRCodeSVG } from "qrcode.react";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { toast } from "../../utils/toast";
import { useClientTranslations } from "../../utils/translations/client";
import Modal from "../Modal";

function useCopyLink(url: string) {
  const t = useClientTranslations("client.ShareUserLinkButton");

  return useCallback(
    function () {
      void navigator.clipboard.writeText(url).then(function () {
        toast.success(t("toastMessage"));
      });
    },
    [url, t],
  );
}

function useShareLink(url: string) {
  const [supportsSharing, setSupportsSharing] = useState(false);

  useEffect(
    function () {
      setSupportsSharing(
        navigator.share instanceof Function &&
          navigator.canShare instanceof Function &&
          navigator.canShare({ url }),
      );
    },
    [url],
  );

  const shareLink = useCallback(
    function () {
      navigator.share({ url }).catch(function () {
        // probably just cancelled
      });
    },
    [url],
  );

  return supportsSharing ? shareLink : undefined;
}

type Props = {
  url: string;
};

export default forwardRef<HTMLDialogElement, Props>(function ShareUserLinkModal(props, ref) {
  const t = useClientTranslations("client.ShareUserLinkButton");

  const copyLink = useCopyLink(props.url);
  const shareLink = useShareLink(props.url);

  return (
    <Modal className="flex flex-col items-center gap-4" ref={ref}>
      <h3 className="text-center text-lg">{t("modalTitle")}</h3>
      <QRCodeSVG includeMargin size={320} value={props.url} />
      <form className="modal-action" method="dialog">
        <button className="btn" onClick={copyLink} type="submit">
          <ClipboardDocumentIcon className="h-6 w-6" />
        </button>
        {shareLink !== undefined && (
          <button className="btn" onClick={shareLink} type="submit">
            <ShareIcon className="h-6 w-6" />
          </button>
        )}
      </form>
    </Modal>
  );
});
