import { char, date, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import "server-only";
import { wishes } from "./wishes";

export const comments = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  text: varchar("text", { length: 256 }).notNull(),
  date: date("date").notNull(),

  userId: char("user_id", { length: 32 }).notNull(),
  wishId: uuid("wish_id")
    .notNull()
    .references(() => wishes.id),
});
