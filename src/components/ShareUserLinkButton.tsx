"use client";

import { ClipboardDocumentIcon, ShareIcon } from "@heroicons/react/24/outline";
import { QRCodeSVG } from "qrcode.react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "../utils/toast";
import { useClientTranslations } from "../utils/translations/client";
import Modal from "./Modal";

function useShareLink(url: string): [boolean, () => void] {
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
      if (supportsSharing) {
        navigator.share({ url }).catch(function () {
          // probably just cancelled
        });
      }
    },
    [supportsSharing, url],
  );

  return [supportsSharing, shareLink];
}

type Props = {
  id: string;
};

export default function ShareUserLinkButton(props: Props): JSX.Element {
  const t = useClientTranslations("client.ShareUserLinkButton");

  const url = new URL(`/user/${props.id}`, location.href).href;

  function copyLink() {
    void navigator.clipboard.writeText(url).then(function () {
      toast.success(t("toastMessage"));
    });
  }

  const [canShare, shareLink] = useShareLink(url);

  const modalRef = useRef<HTMLDialogElement>(null);

  function showModal() {
    modalRef.current?.showModal();
  }

  return (
    <>
      <button className="btn self-center" onClick={showModal}>
        {t("buttonText")}
      </button>
      <Modal className="flex flex-col items-center gap-4" ref={modalRef}>
        <h3 className="text-center text-lg">{t("modalTitle")}</h3>
        <QRCodeSVG includeMargin size={320} value={url} />
        <form className="modal-action" method="dialog">
          <button className="btn" onClick={copyLink} type="submit">
            <ClipboardDocumentIcon className="h-6 w-6" />
          </button>
          {canShare && (
            <button className="btn" onClick={shareLink} type="submit">
              <ShareIcon className="h-6 w-6" />
            </button>
          )}
        </form>
      </Modal>
    </>
  );
}
