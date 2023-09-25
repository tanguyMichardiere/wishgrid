"use client";

import { LockOpenIcon } from "@heroicons/react/24/outline";
import { useClientTranslations } from "../utils/translations/client";
import { trpc } from "../utils/trpc/client";
import MutationButton from "./MutationButton";

type Props = {
  userId: string;
  wishId: string;
};

export default function UnreserveWishButton(props: Props): JSX.Element {
  const t = useClientTranslations("clientComponents.UnreserveWishButton");

  const trpcContext = trpc.useContext();

  const unreserveWish = trpc.wishes.unreserve.useMutation({
    async onMutate({ id }) {
      await trpcContext.wishes.list.cancel({ userId: props.userId });

      const previousWishList = trpcContext.wishes.list.getData({ userId: props.userId });

      // update wish list
      trpcContext.wishes.list.setData(
        { userId: props.userId },
        (wishes) => wishes?.map((wish) => (wish.id === id ? { ...wish, reservedBy: null } : wish)),
      );

      return { previousWishList };
    },
    onError(_error, _variables, context) {
      if (context?.previousWishList !== undefined) {
        trpcContext.wishes.list.setData({ userId: props.userId }, context.previousWishList);
      }
    },
    async onSettled() {
      await trpcContext.wishes.list.invalidate({ userId: props.userId });
    },
  });

  return (
    <MutationButton
      className="btn-primary"
      mutation={unreserveWish}
      variables={{ id: props.wishId }}
    >
      <LockOpenIcon className="h-6 w-6" />
      {t("text")}
    </MutationButton>
  );
}
