import "client-only";
import { useCurrentUser } from "../../../context/currentUser/hook";
import { trpc } from "../../../utils/trpc/client";

export function useReserveWishMutation(
  userId: string,
): ReturnType<typeof trpc.wishes.reserve.useMutation> {
  const currentUser = useCurrentUser();

  const trpcContext = trpc.useContext();

  return trpc.wishes.reserve.useMutation({
    async onMutate({ id }) {
      await trpcContext.wishes.list.cancel({ userId });

      const previousWishList = trpcContext.wishes.list.getData({ userId });

      // update wish list
      trpcContext.wishes.list.setData(
        { userId },
        (wishes) =>
          wishes?.map((wish) => (wish.id === id ? { ...wish, reservedBy: currentUser } : wish)),
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
