import { char, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import "server-only";

export const wishes = pgTable("wishes", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 32 }).notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  link: varchar("link", { length: 191 }).notNull(),

  userId: char("user_id", { length: 32 }).notNull(),
  reservedById: char("reserved_by_id", { length: 32 }),
});
