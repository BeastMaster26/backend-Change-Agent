import { PrismaClient } from "../generated/prisma";
import "dotenv/config";
import { defineConfig } from "prisma/config";
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL, 
    },
  },
});
