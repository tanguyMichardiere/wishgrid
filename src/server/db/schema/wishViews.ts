import { relations } from "drizzle-orm";
import { char, pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { wishes } from "./wishes";

export const wishViews = pgTable(
  "wish_views",
  {
    userId: char("user_id", { length: 32 }).notNull(),
    wishId: uuid("wish_id")
      .notNull()
      .references(() => wishes.id, { onDelete: "cascade" }),
  },
  (table) => ({
    primaryKey: primaryKey(table.userId, table.wishId),
  }),
);

export const wishViewsRelations = relations(wishViews, ({ one }) => ({
  wish: one(wishes, { fields: [wishViews.wishId], references: [wishes.id] }),
}));
