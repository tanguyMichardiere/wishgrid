import "client-only";
import { useCurrentUser } from "../../../context/currentUser/hook";
import { trpc } from "../../../utils/trpc/client";

export function useCreateWishMutation(): ReturnType<typeof trpc.wishes.create.useMutation> {
  const currentUser = useCurrentUser();

  const trpcContext = trpc.useContext();

  return trpc.wishes.create.useMutation({
    // no optimistic update because we don't know the ID yet
    onSuccess(id, { title, description, link }) {
      trpcContext.wishes.listOwn.setData(undefined, (wishes) =>
        wishes !== undefined
          ? [
              ...wishes,
              { id, title, description, link, userId: currentUser.id, reservedById: null },
            ].toSorted((a, b) => a.title.localeCompare(b.title))
          : undefined,
      );
    },
    async onSettled() {
      await trpcContext.wishes.listOwn.invalidate();
    },
  });
}
