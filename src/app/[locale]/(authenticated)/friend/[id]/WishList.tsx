"use client";

import WishPreviewCard from "../../../../../components/WishPreviewCard";
import type { Wish } from "../../../../../server/database/types/wishes";
import { useClientTranslations } from "../../../../../utils/translations/client";
import { trpc } from "../../../../../utils/trpc/client";

type Props = {
  initialWishes: Array<Wish>;
  userId: string;
};

export default function WishList(props: Props): JSX.Element {
  const t = useClientTranslations("client.WishList");

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
