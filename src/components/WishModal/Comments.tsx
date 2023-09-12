"use client";

import cx from "classix";
import type { Comment } from "../../server/db/types/comments";
import type { User } from "../../server/db/types/user";
import { formatTimestamp } from "../../utils/formatTimestamp";
import { trpc } from "../../utils/trpc/client";
import Avatar from "../Avatar";

type Props = {
  initialCurrentUser: User;
  comments: Array<Comment>;
};

export default function Comments(props: Props): JSX.Element {
  const currentUser = trpc.users.getCurrent.useQuery(undefined, {
    initialData: props.initialCurrentUser,
  });

  return (
    <ul className="w-72">
      {props.comments.map((comment) => (
        <li
          className={cx(
            "chat",
            comment.user.id === currentUser.data.id ? "chat-end" : "chat-start",
          )}
          key={comment.id}
        >
          <Avatar className="chat-image" initialUser={comment.user} size="small" />
          <div className="chat-header">{comment.user.username}</div>
          <div className="chat-bubble break-words">{comment.text}</div>
          <div className="chat-footer opacity-50">{formatTimestamp(comment.timestamp)}</div>
        </li>
      ))}
    </ul>
  );
}
