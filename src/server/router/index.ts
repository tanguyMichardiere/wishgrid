import type { inferReactQueryProcedureOptions } from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import "server-only";
import { createRouter } from "..";
import { comments } from "./comments";
import { friendRequests } from "./friendRequests";
import { friends } from "./friends";
import { users } from "./users";
import { wishes } from "./wishes";

export const router = createRouter({
  users,
  friends,
  friendRequests,
  wishes,
  comments,
});

export type Router = typeof router;

export type ReactQueryOptions = inferReactQueryProcedureOptions<Router>;
export type RouterInputs = inferRouterInputs<Router>;
export type RouterOutputs = inferRouterOutputs<Router>;
