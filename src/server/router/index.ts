import "server-only";
import { createRouter } from "..";
import { commentsRouter } from "./comments";
import { friendRequestsRouter } from "./friendRequests";
import { friendsRouter } from "./friends";
import { usersRouter } from "./users";
import { wishesRouter } from "./wishes";

export const router = createRouter({
  users: usersRouter,
  friends: friendsRouter,
  friendRequests: friendRequestsRouter,
  wishes: wishesRouter,
  comments: commentsRouter,
});

export type Router = typeof router;
