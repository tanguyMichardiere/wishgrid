"use client";

import { useEffect, useRef, useState } from "react";
import { useClientTranslations } from "../../utils/translations/client";
import ShareUserLinkModal from "./ShareUserLinkModal";

function useUrl(id: string) {
  const [url, setUrl] = useState<string>();

  useEffect(
    function () {
      setUrl(new URL(`/user/${id}`, location.href).href);
    },
    [id],
  );

  return url;
}

type Props = {
  id: string;
};

export default function ShareUserLinkButton(props: Props): JSX.Element {
  const t = useClientTranslations("client.ShareUserLinkButton");

  const url = useUrl(props.id);

  const modalRef = useRef<HTMLDialogElement>(null);

  function showModal() {
    modalRef.current?.showModal();
  }

  return (
    <>
      <button className="btn self-center" disabled={url === undefined} onClick={showModal}>
        {t("buttonText")}
      </button>
      {url !== undefined && <ShareUserLinkModal ref={modalRef} url={url} />}
    </>
  );
}
