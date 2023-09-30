import "server-only";
import { createRouter } from "../..";
import { accept } from "./accept";
import { cancel } from "./cancel";
import { create } from "./create";
import { decline } from "./decline";
import { list } from "./list";
import { status } from "./status";

export const friendRequests = createRouter({
  // queries
  list,
  status,
  // mutations
  accept,
  cancel,
  create,
  decline,
});
