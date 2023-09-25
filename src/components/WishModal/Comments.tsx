"use client";

import cx from "classix";
import type { DateTimeFormatOptions } from "next-intl";
import { useFormatter, useNow } from "next-intl";
import { useCurrentUser } from "../../context/currentUser/hook";
import type { Comment } from "../../server/db/types/comments";
import Avatar from "../Avatar";

const dateTimeFormatOptions: DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

type Props = {
  comments: Array<Comment>;
};

export default function Comments(props: Props): JSX.Element | null {
  const currentUser = useCurrentUser();

  const now = useNow();
  const format = useFormatter();

  if (props.comments.length === 0) {
    return null;
  }

  return (
    <ul className="w-72">
      {props.comments.map(function (comment, index, comments) {
        const previousComment = comments[index - 1];
        const collapsedWithPrevious =
          previousComment !== undefined &&
          previousComment.user.id === comment.user.id &&
          previousComment.timestamp.getDate() === comment.timestamp.getDate() &&
          previousComment.timestamp.getMonth() === comment.timestamp.getMonth() &&
          previousComment.timestamp.getFullYear() === comment.timestamp.getFullYear();
        const nextComment = comments[index + 1];
        const collapsedWithNext =
          nextComment !== undefined &&
          nextComment.user.id === comment.user.id &&
          nextComment.timestamp.getDate() === comment.timestamp.getDate() &&
          nextComment.timestamp.getMonth() === comment.timestamp.getMonth() &&
          nextComment.timestamp.getFullYear() === comment.timestamp.getFullYear();
        return (
          <li
            className={cx("chat", comment.user.id === currentUser.id ? "chat-end" : "chat-start")}
            key={comment.id}
          >
            <Avatar className="chat-image" size="small" user={comment.user} />
            {!collapsedWithPrevious && <div className="chat-header">{comment.user.username}</div>}
            <div className="chat-bubble break-words">{comment.text}</div>
            {!collapsedWithNext && now.getTime() - comment.timestamp.getTime() > 60000 && (
              <div
                className="tooltip"
                data-tip={format.dateTime(comment.timestamp, dateTimeFormatOptions)}
              >
                <div className="chat-footer opacity-50">
                  {format.relativeTime(comment.timestamp, now)}
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
