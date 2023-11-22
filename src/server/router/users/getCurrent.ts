import "server-only";
import { procedure } from "../..";
import { User } from "../../database/types/user";

export const getCurrent = procedure.output(User).query(function ({ ctx }) {
  return ctx.user;
});
