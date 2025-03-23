"use server";
import { prisma } from "@/prisma/db";
import { z } from "zod";
import { StudentFormSchema } from "@/lib/zod";

export async function fetchProfileAction(email: string) {
  const profile = await prisma.user.findUnique({
    where: { email },
  });

  if (!profile) throw new Error("Profile not found");
  return profile;
}

// Server Action for updating profile data
export async function updateProfileAction(
  data: z.infer<typeof StudentFormSchema>
) {
  const updatedProfile = await prisma.user.update({
    where: { email: data.email },
    data: data,
  });
  return updatedProfile;
}
