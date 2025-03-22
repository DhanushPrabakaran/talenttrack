import type { NextAuthConfig, User } from "next-auth";
import { ZodError } from "zod";

import Credentials from "next-auth/providers/credentials";
import {
  // saltAndHashPassword,
  // getUserFromDb,
  registerOrGetUserAction,
} from "@/actions/auth";
import { signInSchema } from "./lib/zod";
import { use } from "react";

export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials): Promise<User | null> => {
        try {
          if (!credentials) return null;

          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const user = await registerOrGetUserAction(email, password);

          return {
            id: user.id,
            email: user.email,
            role:user.role
            image: user.image
              ? user.image
              : "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg",
          };
        } catch (error) {
          if (error instanceof ZodError) {
            console.error("Validation error:", error.format());
          } else {
            console.error("Authorization error:", error);
          }
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
} satisfies NextAuthConfig;
