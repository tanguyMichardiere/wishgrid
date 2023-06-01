import type { User } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { searchUsers } from "../../../../server/users";

export const runtime = "edge";

const RequestQuery = z.object({
  query: z.string().min(4).max(32),
});
export type RequestQuery = z.infer<typeof RequestQuery>;

export type ResponseBody = {
  users: Array<User>;
};

export async function GET(request: NextResponse): Promise<NextResponse<ResponseBody>> {
  const body = RequestQuery.parse(Object.fromEntries(new URL(request.url).searchParams));

  const users = await searchUsers(body.query);

  return NextResponse.json({ users });
}
