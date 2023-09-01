import { char, pgTable, primaryKey } from "drizzle-orm/pg-core";
import "server-only";

export const friends = pgTable(
  "friends",
  {
    userId: char("user_id", { length: 32 }).notNull(),
    friendId: char("friend_id", { length: 32 }).notNull(),
  },
  (table) => ({
    pk: primaryKey(table.userId, table.friendId),
  }),
);
