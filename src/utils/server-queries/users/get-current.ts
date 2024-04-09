import "server-only";
import { serverQuery } from "..";

export const getCurrentUser = serverQuery((trpc) => trpc.users.getCurrent.fetch());
