import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { eq, or } from "drizzle-orm";
import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { db } from "../../../db";
import { comments } from "../../../db/schema/comments";
import { friendRequests } from "../../../db/schema/friendRequests";
import { friends } from "../../../db/schema/friends";
import { wishes } from "../../../db/schema/wishes";
import { CLERK_WEBHOOK_SIGNING_SECRET } from "../../../env";

export const runtime = "edge";

const webhook = new Webhook(CLERK_WEBHOOK_SIGNING_SECRET);

export async function POST(request: NextRequest): Promise<NextResponse<Record<string, never>>> {
  let evt: WebhookEvent;
  try {
    // TODO: check that headers() works here (wrong type)
    // @ts-expect-error the body type is guaranteed by svix
    const payload: { evt: WebhookEvent } = webhook.verify(await request.text(), headers());
    evt = payload.evt;
  } catch {
    return NextResponse.json({}, { status: 401 });
  }

  switch (evt.type) {
    case "user.deleted": {
      if (evt.data.deleted && evt.data.id !== undefined) {
        const id = evt.data.id;

        await Promise.all([
          db.delete(wishes).where(eq(wishes.userId, id)),
          db.update(wishes).set({ reservedById: null }).where(eq(wishes.reservedById, id)),
          db.delete(friends).where(or(eq(friends.userId, id), eq(friends.friendId, id))),
          db
            .delete(friendRequests)
            .where(or(eq(friendRequests.userId, id), eq(friendRequests.friendId, id))),
          // TODO: anonymize comments instead?
          db.delete(comments).where(eq(comments.userId, id)),
        ]);
      }
      return NextResponse.json({});
    }
    default: {
      return NextResponse.json({}, { status: 400 });
    }
  }
}
