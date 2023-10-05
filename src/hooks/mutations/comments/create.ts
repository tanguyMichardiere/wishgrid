import "client-only";
import { useCurrentUser } from "../../../context/currentUser/hook";
import type { Router } from "../../../server/router";
import { toast } from "../../../utils/toast";
import { useClientTranslations } from "../../../utils/translations/client";
import { trpc } from "../../../utils/trpc/client";
import type { RelatedProcedures } from "../relatedProcedures";

function useRelatedProcedures(userId: string): RelatedProcedures<Router["comments"]["create"]> {
  const currentUser = useCurrentUser();

  const trpcContext = trpc.useContext();

  return {
    setData({ text, wishId }, { id, timestamp }) {
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
    async invalidate() {
      await trpcContext.wishes.list.invalidate({ userId });
    },
  };
}

export function useCreateCommentMutation(
  userId: string,
  { onSuccess }: { onSuccess?: () => void } = {},
): ReturnType<typeof trpc.comments.create.useMutation> {
  const t = useClientTranslations("client.mutations.comments.create");

  const relatedProcedures = useRelatedProcedures(userId);

  return trpc.comments.create.useMutation({
    onSuccess(data, variables) {
      relatedProcedures.setData(variables, data);
      onSuccess?.();
    },
    onError() {
      toast.error(t("errorText"));
    },
    async onSettled(_data, _error, variables) {
      await relatedProcedures.invalidate(variables);
    },
  });
}
