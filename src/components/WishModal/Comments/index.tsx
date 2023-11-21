"use client";

import cx from "classix";
import { useFormatter, useNow } from "next-intl";
import { useMemo } from "react";
import { useCurrentUser } from "../../../context/currentUser/hook";
import type { Comment } from "../../../server/database/types/comments";
import { extractDay } from "../../../utils/dates";
import Avatar from "../../Avatar";
import { useCollapsedComments } from "./collapsedComments";

type Props = {
  comments: Array<Comment>;
};

export default function Comments(props: Props): JSX.Element {
  const format = useFormatter();
  const now = useNow();

  const currentUser = useCurrentUser();

  const todayTimestamp = useMemo(() => extractDay(now).getTime(), [now]);

  const collapsedComments = useCollapsedComments(props.comments);

  return (
    <ul className="flex max-h-72 flex-col-reverse overflow-y-scroll">
      {collapsedComments.map(({ comment, collapsedWithPrevious, collapsedWithNext }) => (
        <li
          className={cx("chat", comment.user.id === currentUser.id ? "chat-end" : "chat-start")}
          key={comment.id}
        >
          <Avatar className="chat-image" size="small" user={comment.user} />
          {!collapsedWithPrevious && <div className="chat-header">{comment.user.name}</div>}
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
