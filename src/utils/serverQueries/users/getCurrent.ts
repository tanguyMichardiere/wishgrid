import { redirect } from "next-intl/server";
import { cache } from "react";
import "server-only";
import { createServerSideHelpers } from "../../trpc/server";

async function fn() {
  const trpc = await createServerSideHelpers();

  try {
    return await trpc.users.getCurrent.fetch();
  } catch {
    redirect("/sign-in");
  }
}

export const getCurrentUser = cache(fn);
