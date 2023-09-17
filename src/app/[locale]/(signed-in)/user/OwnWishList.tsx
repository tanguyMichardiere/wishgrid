"use client";

import { useTranslations } from "next-intl";
import OwnWishPreviewCard from "../../../../components/OwnWishPreviewCard";
import type { OwnWish } from "../../../../server/db/types/wishes";
import { trpc } from "../../../../utils/trpc/client";

type Props = {
  initialWishes: Array<OwnWish>;
};

export default function OwnWishList(props: Props): JSX.Element {
  const t = useTranslations("clientComponents.OwnWishList");

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
