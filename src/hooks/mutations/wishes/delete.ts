import "client-only";
import { trpc } from "../../../utils/trpc/client";

export function useDeleteWishMutation(): ReturnType<typeof trpc.wishes.delete.useMutation> {
  const trpcContext = trpc.useContext();

  return trpc.wishes.delete.useMutation({
    async onMutate({ id }) {
      await trpcContext.wishes.listOwn.cancel();

      const previousOwnWishesList = trpcContext.wishes.listOwn.getData();

      // update own wishes list
      trpcContext.wishes.listOwn.setData(
        undefined,
        (wishes) => wishes?.filter((wish) => wish.id !== id),
      );

      return { previousOwnWishesList };
    },
    onError(_error, _variables, context) {
      if (context?.previousOwnWishesList !== undefined) {
        trpcContext.wishes.listOwn.setData(undefined, context.previousOwnWishesList);
      }
    },
    async onSettled() {
      await trpcContext.wishes.listOwn.invalidate();
    },
  });
}
