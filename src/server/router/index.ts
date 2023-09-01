import "server-only";
import { t } from "..";
import { friendRequestsRouter } from "./friendRequests";
import { friendsRouter } from "./friends";
import { usersRouter } from "./users";

export const router = t.router({
  users: usersRouter,
  friends: friendsRouter,
  friendRequests: friendRequestsRouter,
});

export type Router = typeof router;
