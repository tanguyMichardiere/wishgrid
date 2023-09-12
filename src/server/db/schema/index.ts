import { comments, commentsRelations } from "./comments";
import { friendRequests } from "./friendRequests";
import { friends } from "./friends";
import { wishes, wishesRelations } from "./wishes";

export const schema = {
  friends,
  friendRequests,
  wishes,
  wishesRelations,
  comments,
  commentsRelations,
};
