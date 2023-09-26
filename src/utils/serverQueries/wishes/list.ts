import { notFound } from "next/navigation";
import { cache } from "react";
import "server-only";
import { createServerSideHelpers } from "../../trpc/server";

async function fn(userId: string) {
  const trpc = await createServerSideHelpers();

  try {
    return await trpc.wishes.list.fetch({ userId });
  } catch {
    notFound();
  }
}

export const getWishesList = cache(fn);
