"use client";

import cx from "classix";
import { useFormatter, useNow } from "next-intl";
import { useMemo } from "react";
import { useCurrentUser } from "../../context/currentUser/hook";
import type { Comment } from "../../server/db/types/comments";
import Avatar from "../Avatar";

type Props = {
  comments: Array<Comment>;
};

export default function Comments(props: Props): JSX.Element {
  const format = useFormatter();
  const now = useNow();

  const currentUser = useCurrentUser();

  const todayTimestamp = useMemo(
    () => new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(),
    [now],
  );

  return (
    <ul className="flex max-h-72 flex-col-reverse overflow-y-scroll">
      {props.comments
        .map((comment) => ({
          ...comment,
          dayTimestamp: new Date(
            comment.timestamp.getFullYear(),
            comment.timestamp.getMonth(),
            comment.timestamp.getDate(),
          ).getTime(),
        }))
        .map((comment, index, comments) => ({
          comment,
          // comments are in reverse chronological order (newest first)
          previousComment: comments[index + 1],
          nextComment: comments[index - 1],
        }))
        .map(({ comment, previousComment, nextComment }) => ({
          comment,
          collapsedWithPrevious:
            previousComment !== undefined &&
            previousComment.user.id === comment.user.id &&
            previousComment.dayTimestamp === comment.dayTimestamp,
          collapsedWithNext:
            nextComment !== undefined &&
            nextComment.user.id === comment.user.id &&
            nextComment.dayTimestamp === comment.dayTimestamp,
        }))
        .map(({ comment, collapsedWithPrevious, collapsedWithNext }) => (
          <li
            className={cx("chat", comment.user.id === currentUser.id ? "chat-end" : "chat-start")}
            key={comment.id}
          >
            <Avatar className="chat-image" size="small" user={comment.user} />
            {!collapsedWithPrevious && <div className="chat-header">{comment.user.username}</div>}
            <div className="chat-bubble break-words">{comment.text}</div>
            {!collapsedWithNext && now.getTime() - comment.timestamp.getTime() > 60000 && (
              <div className="chat-footer">
                <div
                  className={cx(comment.dayTimestamp !== todayTimestamp && "tooltip")}
                  data-tip={format.dateTime(comment.timestamp)}
                >
                  <span className="opacity-50">{format.relativeTime(comment.timestamp, now)}</span>
                </div>
              </div>
            )}
          </li>
        ))}
    </ul>
  );
}
