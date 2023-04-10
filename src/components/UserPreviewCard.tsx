import type { User } from "@prisma/client";
import Avatar from "./Avatar";

type Props = {
  user: Pick<User, "id" | "name" | "image">;
};

export default function UserPreviewCard(props: Props): JSX.Element {
  return (
    <div className="@container">
      <div className="border-base-900 flex max-w-sm flex-grow flex-row items-center gap-4 bg-base-100 px-4 py-2 transition-colors hover:bg-base-200 @sm:mx-2 @sm:mb-2 @sm:rounded-xl @sm:shadow-xl">
        <Avatar size="small" user={props.user} />
        {props.user.name ?? props.user.id}
      </div>
    </div>
  );
}
