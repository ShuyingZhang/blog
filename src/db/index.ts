import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let dbInstance: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (!dbInstance && process.env.DATABASE_URL) {
    const sql = neon(process.env.DATABASE_URL);
    dbInstance = drizzle(sql, { schema });
  }
  if (!dbInstance) {
    throw new Error(
      "Database not configured. Please set DATABASE_URL environment variable.",
    );
  }
  return dbInstance;
}

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(target, prop) {
    const database = getDb();
    return Reflect.get(database, prop);
  },
});

export { schema, getDb };
