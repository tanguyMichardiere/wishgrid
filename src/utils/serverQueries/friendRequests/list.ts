import "server-only";
import { serverQuery } from "..";

export const getFriendRequestsList = serverQuery((trpc) => trpc.friendRequests.list.fetch());
