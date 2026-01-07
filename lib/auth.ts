import { schema } from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { drizzle } from "drizzle-orm/libsql";
const db = drizzle(process.env.DB_FILE_NAME!);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite", // or "mysql", "pg"
    schema,
  }),

  emailAndPassword: {
    enabled: true,
  },
  // socialProviders: {
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID as string,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  //   },
  // },
  plugins: [nextCookies()],
});
