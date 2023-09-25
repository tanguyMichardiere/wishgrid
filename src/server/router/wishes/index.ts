import "server-only";
import { createRouter } from "../..";
import { create } from "./create";
import { deleteWish } from "./delete";
import { list } from "./list";
import { listOwn } from "./listOwn";
import { reserve } from "./reserve";
import { unreserve } from "./unreserve";

export const wishes = createRouter({
  create,
  reserve,
  unreserve,
  delete: deleteWish,
  listOwn,
  list,
});
