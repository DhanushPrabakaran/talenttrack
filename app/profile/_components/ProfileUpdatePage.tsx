"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  fetchProfileAction,
  updateProfileAction,
} from "@/actions/profileActions";
import { StudentFormSchema } from "@/lib/zod";

export default function ProfileUpdatePage({ email }: { email: string }) {
  const form = useForm<z.infer<typeof StudentFormSchema>>({
    resolver: zodResolver(StudentFormSchema),
    defaultValues: async () => {
      try {
        const profile = await fetchProfileAction(email);
        return {
          name: profile.name || "",
          email: profile.email || "",
          bio: profile.bio || "",
          website: profile.website || "",
          image: profile.image || "",
          gitLink: profile.gitLink || "",
          linkedinLink: profile.linkedinLink || "",
          leetCodeLink: profile.leetCodeLink || "",
          codeStudioLink: profile.codeStudioLink || "",
          geeksForGeeksLink: profile.geeksForGeeksLink || "",
          interviewBitLink: profile.interviewBitLink || "",
          codeChefLink: profile.codeChefLink || "",
          codeForcesLink: profile.codeForcesLink || "",
          hackerRankLink: profile.hackerRankLink || "",
          solvedQuestions: profile.solvedQuestions || 0,
          resume: profile.resume || "",
          age: profile.age || 20,
          department: profile.department || "",
          degree: profile.degree || "",
          marks10th: profile.marks10th || 0,
          marks12th: profile.marks12th || 0,
          marksDegree: profile.marksDegree || 0,
        };
      } catch (error: unknown) {
        toast({
          title: "Error loading profile",
          description:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
        });
        return {
          name: "",
          email: "",
          bio: "",
          website: "",
          image: "",
          gitLink: "",
          linkedinLink: "",
          leetCodeLink: "",
          codeStudioLink: "",
          geeksForGeeksLink: "",
          interviewBitLink: "",
          codeChefLink: "",
          codeForcesLink: "",
          hackerRankLink: "",
          solvedQuestions: 0,
          resume: "",
          age: 0,
          department: "",
          degree: "",
          marks10th: 0,
          marks12th: 0,
          marksDegree: 0,
        };
      }
    },
  });

  async function onSubmit(data: z.infer<typeof StudentFormSchema>) {
    try {
      await updateProfileAction(data);
      toast({
        title: "Profile updated successfully!",
        description: "Your changes have been saved.",
      });
    } catch (error: unknown) {
      toast({
        title: "Error updating profile",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-xl font-mono p-2 space-y-6"
      >
        {Object.keys(StudentFormSchema.shape).map((fieldName) => (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName as keyof z.infer<typeof StudentFormSchema>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                </FormLabel>
                <FormControl>
                  {fieldName === "bio" ? (
                    <Textarea
                      placeholder={`Enter your ${fieldName}`}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  ) : (
                    <Input
                      type={typeof field.value === "number" ? "number" : "text"}
                      placeholder={`Enter your ${fieldName}`}
                      value={field.value || ""}
                      onChange={(e) =>
                        field.onChange(
                          typeof field.value === "number"
                            ? Number(e.target.value)
                            : e.target.value
                        )
                      }
                      disabled={fieldName === "email"}
                    />
                  )}
                </FormControl>
                <FormDescription>
                  {fieldName === "email"
                    ? "Your email cannot be changed."
                    : `Enter your ${fieldName}`}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
