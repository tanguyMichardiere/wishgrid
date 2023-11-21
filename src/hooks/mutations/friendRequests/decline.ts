import "client-only";
import type { Router } from "../../../server/router";
import { useOptimisticUpdates } from "../../../state/optimisticUpdates";
import { toast } from "../../../utils/toast";
import { useClientTranslations } from "../../../utils/translations/client";
import { trpc } from "../../../utils/trpc/client";
import type { OptimisticRelatedProcedures } from "../relatedProcedures";

function useRelatedProcedures(): OptimisticRelatedProcedures<
  Router["friendRequests"]["decline"],
  [Router["friendRequests"]["list"], Router["friendRequests"]["status"]]
> {
  const trpcUtils = trpc.useUtils();

  return {
    async cancel({ userId }) {
      await Promise.all([
        trpcUtils.friendRequests.list.cancel(),
        trpcUtils.friendRequests.status.cancel({ userId }),
      ]);
    },
    getData({ userId }) {
      return [
        trpcUtils.friendRequests.list.getData(),
        trpcUtils.friendRequests.status.getData({ userId }),
      ];
    },
    setData({ userId }) {
      trpcUtils.friendRequests.list.setData(undefined, (friendRequests) =>
        friendRequests !== undefined
          ? friendRequests.filter((user) => user.id !== userId)
          : undefined,
      );
      trpcUtils.friendRequests.status.setData({ userId }, { from: false, to: false });
    },
    revertData({ userId }, context) {
      if (context[0] !== undefined) {
        trpcUtils.friendRequests.list.setData(undefined, context[0]);
      }
      if (context[1] !== undefined) {
        trpcUtils.friendRequests.status.setData({ userId }, context[1]);
      }
    },
    async invalidate({ userId }) {
      await Promise.all([
        trpcUtils.friendRequests.list.invalidate(),
        trpcUtils.friendRequests.status.invalidate({ userId }),
      ]);
    },
  };
}

export function useDeclineFriendRequestMutation({
  onSuccess,
}: { onSuccess?: () => void } = {}): ReturnType<typeof trpc.friendRequests.decline.useMutation> {
  const t = useClientTranslations("client.mutations.friendRequests.decline");

  const relatedProcedures = useRelatedProcedures();

  const optimisticUpdates = useOptimisticUpdates();

  return trpc.friendRequests.create.useMutation({
    async onMutate(variables) {
      if (optimisticUpdates) {
        await relatedProcedures.cancel(variables);
        const context = relatedProcedures.getData(variables);
        relatedProcedures.setData(variables);
        return context;
      }
      return undefined;
    },
    onSuccess(_data, variables) {
      if (!optimisticUpdates) {
        relatedProcedures.setData(variables);
      }
      onSuccess?.();
    },
    onError(_error, variables, context) {
      toast.error(t("errorText"));
      if (context !== undefined) {
        relatedProcedures.revertData(variables, context);
      }
    },
    async onSettled(_data, _error, variables) {
      await relatedProcedures.invalidate(variables);
    },
  });
}
