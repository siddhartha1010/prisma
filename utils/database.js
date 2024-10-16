import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
    // Uncomment the following line to log all SQL queries:
    // log: ["query", "info", "warn", "error", "query_log"],
});

export default prisma;