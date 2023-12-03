import "server-only";
import { serverQuery } from "..";

export const getFriendsList = serverQuery((trpc) => trpc.friends.list.fetch());
