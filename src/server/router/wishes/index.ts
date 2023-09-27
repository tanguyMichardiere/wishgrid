import "server-only";
import { createRouter } from "../..";
import { create } from "./create";
import { deleteWish } from "./delete";
import { list } from "./list";
import { listOwn } from "./listOwn";
import { reserve } from "./reserve";
import { setViewed } from "./setViewed";
import { unreserve } from "./unreserve";
import { update } from "./update";

export const wishes = createRouter({
  // queries
  list,
  listOwn,
  // mutations
  create,
  delete: deleteWish,
  reserve,
  setViewed,
  unreserve,
  update,
});
