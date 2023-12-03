import "server-only";
import { serverQuery } from "..";

export const getWishesListOwn = serverQuery((trpc) => trpc.wishes.listOwn.fetch());
