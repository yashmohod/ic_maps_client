import "server-only";

import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { schema } from "./schema";
import { eq } from "drizzle-orm";

const url = process.env.DATABASE_URL!;
const filePath = url.startsWith("file:") ? url.slice("file:".length) : url;

const sqlite = new Database(filePath);
export const db = drizzle(sqlite, { schema });

export async function getUser(userId: string) {
  const rows = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.id, userId))
    .limit(1);

  return rows[0];
}

