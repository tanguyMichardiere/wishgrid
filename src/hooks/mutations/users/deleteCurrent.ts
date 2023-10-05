import "client-only";
import { useRouter } from "next-intl/client";
import { toast } from "../../../utils/toast";
import { useClientTranslations } from "../../../utils/translations/client";
import { trpc } from "../../../utils/trpc/client";

export function useDeleteCurrentUserMutation(): ReturnType<
  typeof trpc.users.deleteCurrent.useMutation
> {
  const t = useClientTranslations("client.mutations.users.deleteCurrent");

  const router = useRouter();

  return trpc.users.deleteCurrent.useMutation({
    onError() {
      toast.error(t("errorText"));
    },
    onSettled() {
      router.replace("/sign-in");
    },
  });
}
