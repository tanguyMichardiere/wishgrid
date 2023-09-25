import "client-only";
import { useCurrentUser } from "../../../context/currentUser/hook";
import { trpc } from "../../../utils/trpc/client";

export function useCreateCommentMutation(
  userId: string,
): ReturnType<typeof trpc.comments.create.useMutation> {
  const currentUser = useCurrentUser();

  const trpcContext = trpc.useContext();

  return trpc.comments.create.useMutation({
    onSuccess({ id, timestamp }, { text, wishId }) {
      trpcContext.wishes.list.setData(
        { userId },
        (wishes) =>
          wishes?.map((wish) =>
            wish.id === wishId
              ? {
                  ...wish,
                  comments: [{ id, text, timestamp, user: currentUser }, ...wish.comments],
                }
              : wish,
          ),
      );
    },
    async onSettled() {
      await trpcContext.wishes.list.invalidate({ userId });
    },
  });
}
