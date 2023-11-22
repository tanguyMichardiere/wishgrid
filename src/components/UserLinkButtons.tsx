"use client";

import { ClipboardDocumentIcon, ShareIcon } from "@heroicons/react/24/outline";
import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";
import { toast } from "../utils/toast";
import { useClientTranslations } from "../utils/translations/client";
import Modal from "./Modal";

type Props = {
  id: string;
};

export default function UserLinkButtons(props: Props): JSX.Element {
  const t = useClientTranslations("client.UserLinkButtons");

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

  const modalRef = useRef<HTMLDialogElement>(null);

  function showModal() {
    modalRef.current?.showModal();
  }

  return (
    <>
      <div className="tooltip flex gap-2 self-center" data-tip={t("tooltip")}>
        <button className="btn" onClick={showModal}>
          {t("buttonText")}
        </button>
      </div>
      <Modal className="flex flex-col items-center gap-4" ref={modalRef}>
        <QRCodeSVG size={320} value={url} />
        <form className="modal-action" method="dialog">
          <button className="btn" onClick={copyLink} type="submit">
            <ClipboardDocumentIcon className="h-6 w-6" />
          </button>
          {canShare && (
            <button className="btn" onClick={shareLink} type="button">
              <ShareIcon className="h-6 w-6" />
            </button>
          )}
        </form>
      </Modal>
    </>
  );
}
