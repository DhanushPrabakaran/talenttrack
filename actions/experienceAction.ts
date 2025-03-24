"use server";
import { prisma } from "@/prisma/db"; // Assuming you're using Prisma for DB

import { auth } from "@/auth"; // Assuming you're using an auth utility
import { Experience } from "@/types/global";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
// Server function to handle Experience creation
export async function createExperienceAction(data: Experience) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("User not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const Experience = await prisma.experience.create({
    data: {
      ...data,
      userId: user.id,
    },
  });
  redirect(`/dashboard`);
  return Experience;
}

export async function fetchExperience(ExperienceId: string) {
  const data = await prisma.experience.findUnique({
    where: { id: ExperienceId },
  });
  return data;
}
// Server function to handle Experience update
export async function updateExperienceAction(
  ExperienceId: string,
  data: Omit<Experience, "id" | "userId" | "createdAt" | "updatedAt">
) {
  const updatedExperience = await prisma.experience.update({
    where: { id: ExperienceId },
    data,
  });

  revalidatePath(`/dashboard`); // Redirect to the updated Experience page after update
  return updatedExperience;
}

export async function deleteExperienceAction(id: string) {
  const deletes = await prisma.experience.delete({
    where: { id: id },
  });
  revalidatePath("/dashboard");

  return deletes;
}
