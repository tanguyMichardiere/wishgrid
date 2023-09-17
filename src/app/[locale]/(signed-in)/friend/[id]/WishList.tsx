"use client";

import { useTranslations } from "next-intl";
import WishPreviewCard from "../../../../../components/WishPreviewCard";
import type { Wish } from "../../../../../server/db/types/wishes";
import { trpc } from "../../../../../utils/trpc/client";

type Props = {
  initialWishes: Array<Wish>;
  userId: string;
};

export default function WishList(props: Props): JSX.Element {
  const t = useTranslations("clientComponents.WishList");

  const wishes = trpc.wishes.list.useQuery(
    { userId: props.userId },
    { initialData: props.initialWishes },
  );

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
          <WishPreviewCard userId={props.userId} wish={wish} />
        </li>
      ))}
    </>
  );
}
