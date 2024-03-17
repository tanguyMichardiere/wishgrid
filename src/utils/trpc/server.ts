import { createServerSideHelpers as _createServerSideHelpers } from "@trpc/react-query/server";
import "server-only";
import { createContext } from "../../server/context";
import type { Router } from "../../server/router";
import { router } from "../../server/router";
import { transformer } from "./transformer";

export const createServerSideHelpers = async (): Promise<
  ReturnType<typeof _createServerSideHelpers<Router>>
> => _createServerSideHelpers({ router, ctx: await createContext(), transformer });
