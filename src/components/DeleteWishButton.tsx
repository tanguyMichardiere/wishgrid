import { useTranslations } from "next-intl";
import { trpc } from "../utils/trpc/client";
import MutationButton from "./MutationButton";

type Props = {
  wishId: string;
};

export default function DeleteWishButton(props: Props): JSX.Element {
  const t = useTranslations("clientComponents.DeleteWishButton");

  const trpcContext = trpc.useContext();

  const deleteWish = trpc.wishes.delete.useMutation({
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

  return (
    <MutationButton mutation={deleteWish} variables={{ id: props.wishId }}>
      {t("text")}
    </MutationButton>
  );
}
