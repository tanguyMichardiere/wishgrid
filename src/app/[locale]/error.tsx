"use client";

import { useLogger } from "next-axiom";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ reset, ...props }: Props): JSX.Element {
  const t = useTranslations("clientComponents.Error");

  const log = useLogger();

  useEffect(
    function () {
      log.error("client error", { error: props.error });
    },
    [props.error, log],
  );

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h2 className="text-center">{t("title")}</h2>
      {props.error.digest !== undefined && <p>{t("digest", { digest: props.error.digest })}</p>}
      <button className="btn" onClick={reset}>
        {t("tryAgain")}
      </button>
    </div>
  );
}
