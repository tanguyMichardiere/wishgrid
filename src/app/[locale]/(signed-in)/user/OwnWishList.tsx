"use client";

import OwnWishPreviewCard from "../../../../components/OwnWishPreviewCard";
import type { OwnWish } from "../../../../server/db/types/wishes";
import { trpc } from "../../../../utils/trpc/client";

type Props = {
  initialWishes: Array<OwnWish>;
};

export default function OwnWishList(props: Props): JSX.Element {
  const wishes = trpc.wishes.listOwn.useQuery(undefined, { initialData: props.initialWishes });

  if (wishes.data.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <p>No wish</p>
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
