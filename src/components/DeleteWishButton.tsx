import { useDeleteWishMutation } from "../hooks/mutations/wishes/delete";
import { useClientTranslations } from "../utils/translations/client";
import MutationButton from "./MutationButton";

type Props = {
  wishId: string;
};

export default function DeleteWishButton(props: Props): JSX.Element {
  const t = useClientTranslations("clientComponents.DeleteWishButton");

  const deleteWish = useDeleteWishMutation();

  return (
    <MutationButton mutation={deleteWish} variables={{ id: props.wishId }}>
      {t("text")}
    </MutationButton>
  );
}
