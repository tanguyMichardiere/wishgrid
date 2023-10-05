import "client-only";
import { useCurrentUser } from "../../../context/currentUser/hook";
import type { Router } from "../../../server/router";
import { toast } from "../../../utils/toast";
import { useClientTranslations } from "../../../utils/translations/client";
import { trpc } from "../../../utils/trpc/client";
import type { RelatedProcedures } from "../relatedProcedures";

function useRelatedProcedures(): RelatedProcedures<Router["wishes"]["create"]> {
  const currentUser = useCurrentUser();

  const trpcContext = trpc.useContext();

  return {
    setData({ title, description, link }, id) {
      trpcContext.wishes.listOwn.setData(undefined, (wishes) =>
        wishes !== undefined
          ? [
              ...wishes,
              { id, title, description, link, userId: currentUser.id, reservedById: null },
            ].toSorted((a, b) => a.title.localeCompare(b.title))
          : undefined,
      );
    },
    async invalidate() {
      await trpcContext.wishes.listOwn.invalidate();
    },
  };
}

export function useCreateWishMutation({ onSuccess }: { onSuccess?: () => void } = {}): ReturnType<
  typeof trpc.wishes.create.useMutation
> {
  const t = useClientTranslations("client.mutations.wishes.create");

  const relatedProcedures = useRelatedProcedures();

  return trpc.wishes.create.useMutation({
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
