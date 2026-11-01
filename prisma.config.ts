import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// The CLI (migrate, studio) uses the DIRECT connection: Neon's pooled URL goes
// through PgBouncer, which can't hold the locks migrations need.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: env("DIRECT_URL") },
});
