"use server";

import { prisma } from "@/prisma/db";
import { hash, compare } from "bcryptjs";
import { revalidatePath } from "next/cache";

// Utility function to hash the password
export async function saltAndHashPassword(password: string): Promise<string> {
  return await hash(password, 10);
}

// Server action to register a new user or return existing user
export async function registerOrGetUserAction(
  name: string,
  rollNumber: string,
  email: string,
  password: string
): Promise<{ id: string; email: string; image: string; role: string }> {
  let user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid credentials");
  } else {
    const hashedPassword = await saltAndHashPassword(password);
    user = await prisma.user.create({
      data: {
        rollNumber: rollNumber,
        name: name,
        email,
        password: hashedPassword,
        role: "Admin",
      },
    });
  }

  return { id: user.id, email: user.email, image: user.image, role: user.role };
}

// Server action to verify user credentials
export async function getUserFromDb(
  email: string,
  password: string
): Promise<{ id: string; email: string } | null> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) return null;

  return { id: user.id, email: user.email };
}

// Server action to handle password reset
export async function resetPasswordAction(
  email: string,
  newPassword: string
): Promise<{ id: string; email: string }> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const hashedPassword = await saltAndHashPassword(newPassword);
  const updatedUser = await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });

  revalidatePath("/signin");
  return { id: updatedUser.id, email: updatedUser.email };
}

// Server action to delete a user
export async function deleteUserAction(
  email: string
): Promise<{ id: string; email: string }> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const deletedUser = await prisma.user.delete({ where: { email } });

  revalidatePath("/signin");
  return { id: deletedUser.id, email: deletedUser.email };
}

// Server action to fetch user details
export async function getUserDetailsAction(
  email: string
): Promise<{ id: string; email: string } | null> {
  const user = await prisma.user.findUnique({ where: { email } });
  return user ? { id: user.id, email: user.email } : null;
}
