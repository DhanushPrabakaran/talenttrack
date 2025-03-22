import type { NextAuthConfig, User } from "next-auth";
import { ZodError } from "zod";

import Credentials from "next-auth/providers/credentials";
import {
  // saltAndHashPassword,
  // getUserFromDb,
  registerOrGetUserAction,
} from "@/actions/auth";
import { signInSchema } from "./lib/zod";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      // Define the credentials fields
      credentials: {
        name: { label: "Full Name", type: "text" },
        rollNumber: { label: "Roll Number", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials): Promise<User | null> => {
        try {
          if (!credentials) return null;

          // Validate credentials using Zod schema
          const { name, rollNumber, email, password } =
            await signInSchema.parseAsync(credentials);

          // Fetch or create user
          const user = await registerOrGetUserAction(
            name,
            rollNumber,
            email,
            password
          );

          return { id: user.role, email: user.email, image: user.image };
        } catch (error) {
          if (error instanceof ZodError) {
            console.error("Validation error:", error.format());
          } else {
            console.error("Authorization error:", error);
          }
          // Return `null` to indicate that the credentials are invalid
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
} satisfies NextAuthConfig;
