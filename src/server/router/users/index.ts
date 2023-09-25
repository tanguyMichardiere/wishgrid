import "server-only";
import { createRouter } from "../..";
import { deleteCurrent } from "./deleteCurrent";
import { get } from "./get";
import { getCurrent } from "./getCurrent";
import { getMany } from "./getMany";
import { search } from "./search";

export const users = createRouter({
  search,
  getCurrent,
  get,
  getMany,
  deleteCurrent,
});
