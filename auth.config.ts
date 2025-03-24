import type { NextAuthConfig, User } from "next-auth";
import { ZodError } from "zod";

import Credentials from "next-auth/providers/credentials";
import { registerOrGetUserAction } from "@/actions/auth";
import { signInSchema } from "./lib/zod";

export default {
  providers: [
    Credentials({
      credentials: {
        name: { label: "Full Name", type: "text" },
        rollNumber: { label: "Roll Number", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials): Promise<User | null> => {
        try {
          if (!credentials) throw new Error("No credentials provided");

          // ✅ Validate credentials with Zod schema
          const { name, rollNumber, email, password } =
            await signInSchema.parseAsync(credentials);

          // ✅ Fetch or create user
          const user = await registerOrGetUserAction(
            name,
            rollNumber,
            email,
            password
          );

          if (user) {
            return { id: user.role, email: user.email, image: user.image };
          }

          return null;
        } catch (error: unknown) {
          let errorMessage = "An unexpected error occurred";

          // ✅ Handle specific Zod validation errors
          if (error instanceof ZodError) {
            errorMessage =
              "Validation failed: " + JSON.stringify(error.format());
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }

          console.error("Authorization error:", errorMessage);

          // ✅ Throwing an error to trigger the NextAuth redirect with an error param
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
} satisfies NextAuthConfig;
