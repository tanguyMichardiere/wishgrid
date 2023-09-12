import { relations } from "drizzle-orm";
import { char, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { wishes } from "./wishes";

export const comments = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  text: varchar("text", { length: 256 }).notNull(),
  timestamp: timestamp("timestamp", { mode: "date" }).notNull().defaultNow(),

  userId: char("user_id", { length: 32 }).notNull(),
  wishId: uuid("wish_id")
    .notNull()
    .references(() => wishes.id),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  wish: one(wishes, { fields: [comments.wishId], references: [wishes.id] }),
}));
