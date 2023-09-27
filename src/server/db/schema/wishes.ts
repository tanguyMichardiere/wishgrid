import { relations } from "drizzle-orm";
import { char, pgTable, unique, uuid, varchar } from "drizzle-orm/pg-core";
import { comments } from "./comments";
import { wishViews } from "./wishViews";

export const wishes = pgTable(
  "wishes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 32 }).notNull(),
    description: varchar("description", { length: 512 }).notNull(),
    link: varchar("link", { length: 512 }).notNull(),

    userId: char("user_id", { length: 32 }).notNull(),
    reservedById: char("reserved_by_id", { length: 32 }),
  },
  (table) => ({
    uniqueTitle: unique().on(table.userId, table.title),
  }),
);

export const wishesRelations = relations(wishes, ({ many }) => ({
  comments: many(comments),
  wishViews: many(wishViews),
}));
