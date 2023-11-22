import { cache } from "react";
import "server-only";
import { redirect } from "../../../navigation";
import { createServerSideHelpers } from "../../trpc/server";

async function fn() {
  const trpc = await createServerSideHelpers();

  try {
    return await trpc.wishes.listOwn.fetch();
  } catch {
    // TODO: why do we have to return?
    return redirect("/sign-in");
  }
}

export const getWishesListOwn = cache(fn);
