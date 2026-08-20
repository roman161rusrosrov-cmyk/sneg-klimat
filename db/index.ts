import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function getDb() {
  if (!env.DB) {
    throw new Error(
      "The D1 binding `DB` is unavailable. Configure the database binding before using the data layer."
    );
  }

  return drizzle(env.DB, { schema });
}
