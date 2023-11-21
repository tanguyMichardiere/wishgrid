import type { User } from "../server/database/types/user";
import Avatar from "./Avatar";
import Card from "./Card";

type Props = {
  user: User;
};

export default function UserPreviewCard(props: Props): JSX.Element {
  return (
    <Card>
      <Avatar size="small" user={props.user} />
      {props.user.name}
    </Card>
  );
}
