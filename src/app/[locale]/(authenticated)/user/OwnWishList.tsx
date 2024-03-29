"use client";

import type { JSX } from "react";
import OwnWishPreviewCard from "../../../../components/OwnWishPreviewCard";
import type { OwnWish } from "../../../../server/database/types/wishes";
import { useClientTranslations } from "../../../../utils/translations/client";
import { trpc } from "../../../../utils/trpc/client";

type Props = {
  initialWishes: Array<OwnWish>;
};

export default function OwnWishList(props: Props): JSX.Element {
  const t = useClientTranslations("client.OwnWishList");

  const wishes = trpc.wishes.listOwn.useQuery(undefined, { initialData: props.initialWishes });

  if (wishes.data.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <p>{t("noWish")}</p>
      </div>
    );
  }

  return (
    <>
      {wishes.data.map((wish) => (
        <li key={wish.id}>
          <OwnWishPreviewCard wish={wish} />
        </li>
      ))}
    </>
  );
}
