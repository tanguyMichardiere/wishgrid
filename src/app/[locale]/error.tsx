"use client";

import type { JSX } from "react";
import { useClientTranslations } from "../../utils/translations/client";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error(props: Props): JSX.Element {
  const t = useClientTranslations("client.Error");

  // TODO: report error

  return (
    <div className="flex flex-col items-center gap-4 pt-48">
      <h2 className="text-center">{t("title")}</h2>
      {props.error.digest !== undefined && <p>{t("digest", { digest: props.error.digest })}</p>}
      <button className="btn" onClick={props.reset}>
        {t("tryAgain")}
      </button>
    </div>
  );
}
