import "server-only";
import { createRouter } from "../..";
import { deleteCurrent } from "./deleteCurrent";
import { get } from "./get";
import { getCurrent } from "./getCurrent";
import { search } from "./search";
import { update } from "./update";

export const users = createRouter({
  // queries
  get,
  getCurrent,
  search,
  // mutations
  deleteCurrent,
  update,
});
