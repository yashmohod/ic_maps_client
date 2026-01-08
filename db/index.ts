
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { schema } from "./schema";

const url = process.env.DATABASE_URL!;
const filePath = url.startsWith("file:") ? url.slice("file:".length) : url;

// Optional debug:
console.log("[db] sqlite file:", filePath);

const sqlite = new Database(filePath);
export const db = drizzle(sqlite, { schema });

