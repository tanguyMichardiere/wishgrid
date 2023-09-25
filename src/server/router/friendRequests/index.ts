import "server-only";
import { createRouter } from "../..";
import { accept } from "./accept";
import { cancel } from "./cancel";
import { count } from "./count";
import { create } from "./create";
import { decline } from "./decline";
import { list } from "./list";
import { status } from "./status";

export const friendRequests = createRouter({
  count,
  list,
  status,
  create,
  cancel,
  accept,
  decline,
});
