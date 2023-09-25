import "client-only";
import { useRouter } from "next-intl/client";
import { trpc } from "../../../utils/trpc/client";

export function useDeleteCurrentUserMutation(): ReturnType<
  typeof trpc.users.deleteCurrent.useMutation
> {
  const router = useRouter();

  return trpc.users.deleteCurrent.useMutation({
    onSettled() {
      router.replace("/sign-in");
    },
  });
}
