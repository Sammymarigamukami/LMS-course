import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";

export const auth = betterAuth({
      database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    socialProviders: {
      github: {
        clientId: env.AUTH_GITHUB_CLIENT_id,
        clientSecret: env.AUTH_GITHUB_SECRET,
      }
    }
});