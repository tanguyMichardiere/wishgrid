import type { Props as InnerActionButtonProps } from "./InnerActionButton";
import InnerActionButton from "./InnerActionButton";

type Props = InnerActionButtonProps & {
  action: () => Promise<void>;
};

export default function ActionButton({ action, ...innerActionButtonProps }: Props): JSX.Element {
  return (
    <form action={action}>
      <InnerActionButton {...innerActionButtonProps} />
    </form>
  );
}
