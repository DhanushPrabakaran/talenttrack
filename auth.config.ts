import type { NextAuthConfig, User } from "next-auth";

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

          const { name, rollNumber, email, password } =
            await signInSchema.parseAsync(credentials);

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
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error: unknown) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
} satisfies NextAuthConfig;
