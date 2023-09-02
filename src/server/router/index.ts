import "server-only";
import { createRouter } from "..";
import { friendRequestsRouter } from "./friendRequests";
import { friendsRouter } from "./friends";
import { usersRouter } from "./users";

export const router = createRouter({
  users: usersRouter,
  friends: friendsRouter,
  friendRequests: friendRequestsRouter,
});

export type Router = typeof router;
