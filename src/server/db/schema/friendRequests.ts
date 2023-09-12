import { char, pgTable, primaryKey } from "drizzle-orm/pg-core";

export const friendRequests = pgTable(
  "friend_requests",
  {
    userId: char("user_id", { length: 32 }).notNull(),
    friendId: char("friend_id", { length: 32 }).notNull(),
  },
  (table) => ({
    primaryKey: primaryKey(table.userId, table.friendId),
  }),
);
