import "client-only";
import { trpc } from "../../../utils/trpc/client";

export function useSetWishViewedMutation(
  userId: string,
): ReturnType<typeof trpc.wishes.setViewed.useMutation> {
  const trpcContext = trpc.useContext();

  return trpc.wishes.setViewed.useMutation({
    async onMutate({ id }) {
      await Promise.all([
        trpcContext.friends.list.cancel(),
        trpcContext.wishes.list.cancel({ userId }),
      ]);

      const previousFriendList = trpcContext.friends.list.getData();
      const previousWishList = trpcContext.wishes.list.getData({ userId });

      // update friend list
      trpcContext.friends.list.setData(
        undefined,
        (friends) =>
          friends?.map((friend) =>
            friend.id === userId ? { ...friend, newWishCount: friend.newWishCount - 1 } : friend,
          ),
      );
      // update wish list
      trpcContext.wishes.list.setData(
        { userId },
        (wishes) => wishes?.map((wish) => (wish.id === id ? { ...wish, viewed: true } : wish)),
      );

      return { previousFriendList, previousWishList };
    },
    onError(_error, _variables, context) {
      if (context?.previousFriendList !== undefined) {
        trpcContext.friends.list.setData(undefined, context.previousFriendList);
      }
      if (context?.previousWishList !== undefined) {
        trpcContext.wishes.list.setData({ userId }, context.previousWishList);
      }
    },
    async onSettled() {
      await Promise.all([
        trpcContext.friends.list.invalidate(),
        trpcContext.wishes.list.invalidate({ userId }),
      ]);
    },
  });
}
