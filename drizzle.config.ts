import type { Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql", // ✅ required for latest versions
  dbCredentials: {
    url: process.env.DATABASE_URL!, // ✅ this key changed too (was connectionString)
  },
} satisfies Config;
