import type { User } from "@prisma/client";
import Avatar from "./Avatar";

type Props = {
  user: Pick<User, "id" | "name" | "image">;
};

export default function UserPreviewCard(props: Props): JSX.Element {
  return (
    <div className="card flex flex-row items-center gap-4 bg-base-100 px-4 py-2 shadow-xl">
      <Avatar user={props.user} />
      {props.user.name ?? props.user.id}
    </div>
  );
}
