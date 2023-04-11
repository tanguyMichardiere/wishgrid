import { t } from "..";
import { comment } from "./comment";
import { user } from "./user";
import { wish } from "./wish";

export const router = t.router({ user, wish, comment });
export type Router = typeof router;
