"use client";

import cx from "classix";
import { useCurrentUser } from "../../context/currentUser/hook";
import type { Comment } from "../../server/db/types/comments";
import { formatTimestamp } from "../../utils/formatTimestamp";
import Avatar from "../Avatar";

type Props = {
  comments: Array<Comment>;
};

export default function Comments(props: Props): JSX.Element {
  const currentUser = useCurrentUser();

  return (
    <ul className="w-72">
      {props.comments.map((comment) => (
        <li
          className={cx("chat", comment.user.id === currentUser.id ? "chat-end" : "chat-start")}
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
