import "client-only";
import { trpc } from "../../../utils/trpc/client";

export function useUnreserveWishMutation(
  userId: string,
): ReturnType<typeof trpc.wishes.unreserve.useMutation> {
  const trpcContext = trpc.useContext();

  return trpc.wishes.unreserve.useMutation({
    async onMutate({ id }) {
      await trpcContext.wishes.list.cancel({ userId });

      const previousWishList = trpcContext.wishes.list.getData({ userId });

      // update wish list
      trpcContext.wishes.list.setData(
        { userId },
        (wishes) => wishes?.map((wish) => (wish.id === id ? { ...wish, reservedBy: null } : wish)),
      );

      return { previousWishList };
    },
    onError(_error, _variables, context) {
      if (context?.previousWishList !== undefined) {
        trpcContext.wishes.list.setData({ userId }, context.previousWishList);
      }
    },
    async onSettled() {
      await trpcContext.wishes.list.invalidate({ userId });
    },
  });
}
