import { useMemo } from "react";
import type { Comment } from "../../../server/db/types/comments";
import { extractDay } from "../../../utils/dates";

export function useCollapsedComments(comments: Array<Comment>): Array<{
  comment: Comment & { dayTimestamp: number };
  collapsedWithPrevious: boolean;
  collapsedWithNext: boolean;
}> {
  return useMemo(
    () =>
      comments
        .map((comment) => ({ ...comment, dayTimestamp: extractDay(comment.timestamp).getTime() }))
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
        })),
    [comments],
  );
}
