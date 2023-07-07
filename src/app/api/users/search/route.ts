import type { User } from "@clerk/nextjs/dist/types/server";
import type { NextRequest } from "next/server";
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

export async function GET(request: NextRequest): Promise<NextResponse<ResponseBody>> {
  const query = RequestQuery.parse(Object.fromEntries(new URL(request.url).searchParams));

  const users = await searchUsers(query.query);

  return NextResponse.json({ users });
}
