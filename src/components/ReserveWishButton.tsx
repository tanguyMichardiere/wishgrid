"use client";

import type { User } from "../server/db/types/user";
import { trpc } from "../utils/trpc/client";
import MutationButton from "./MutationButton";

type Props = {
  initialCurrentUser: User;
  userId: string;
  wishId: string;
};

export default function ReserveWishButton(props: Props): JSX.Element {
  const currentUser = trpc.users.getCurrent.useQuery(undefined, {
    initialData: props.initialCurrentUser,
  });

  const trpcContext = trpc.useContext();

  const reserveWish = trpc.wishes.reserve.useMutation({
    async onMutate({ id }) {
      await trpcContext.wishes.list.cancel({ userId: props.userId });

      const previousWishList = trpcContext.wishes.list.getData({ userId: props.userId });

      // update wish list
      trpcContext.wishes.list.setData(
        { userId: props.userId },
        (wishes) =>
          wishes?.map((wish) =>
            wish.id === id ? { ...wish, reservedBy: currentUser.data } : wish,
          ),
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
    <MutationButton className="btn-primary" mutation={reserveWish} variables={{ id: props.wishId }}>
      Reserve
    </MutationButton>
  );
}
