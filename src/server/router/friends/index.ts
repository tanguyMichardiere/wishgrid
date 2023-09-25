import "server-only";
import { createRouter } from "../..";
import { get } from "./get";
import { list } from "./list";
import { status } from "./status";

export const friends = createRouter({
  list,
  get,
  status,
});
