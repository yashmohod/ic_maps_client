import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: integer().primaryKey({ autoIncrement: true }),
  isAdmin: integer({ mode: "boolean" }).notNull().default(false),
  isRouteManager: integer({ mode: "boolean" }).notNull().default(false),
  email: text().notNull().unique(),
});
