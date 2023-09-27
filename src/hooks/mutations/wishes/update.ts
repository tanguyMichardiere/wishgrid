import "client-only";
import { trpc } from "../../../utils/trpc/client";

export function useUpdateWishMutation(): ReturnType<typeof trpc.wishes.update.useMutation> {
  const trpcContext = trpc.useContext();

  return trpc.wishes.update.useMutation({
    async onMutate({ id, description, link }) {
      await trpcContext.wishes.listOwn.cancel();

      const previousOwnWishList = trpcContext.wishes.listOwn.getData();

      // update own wish list
      trpcContext.wishes.listOwn.setData(
        undefined,
        (wishes) => wishes?.map((wish) => (wish.id === id ? { ...wish, description, link } : wish)),
      );

      return { previousOwnWishList };
    },
    onError(_error, _variables, context) {
      if (context?.previousOwnWishList !== undefined) {
        trpcContext.wishes.listOwn.setData(undefined, context.previousOwnWishList);
      }
    },
    async onSettled() {
      await trpcContext.wishes.list.invalidate();
    },
  });
}
