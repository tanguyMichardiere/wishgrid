import "server-only";
import { createRouter } from "../..";
import { create } from "./create";

export const comments = createRouter({
  // mutations
  create,
});
