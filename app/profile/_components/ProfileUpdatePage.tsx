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
import {
  fetchProfileAction,
  updateProfileAction,
} from "@/actions/profileActions";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  image: z.string().url(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  bio: z.string().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  experience: z.coerce.number().optional(),
  role: z.string().min(3, "role must be at least 3 characters"),
  gitLink: z.string().url().optional(),
  instaLink: z.string().url().optional().or(z.literal("")),
  linkedinLink: z.string().url().optional(),
});

export default function ProfileUpdatePage({ email }: { email: string }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: async () => {
      try {
        const profile = await fetchProfileAction(email);
        return {
          image: profile.image || "",
          name: profile.name || "",
          email: profile.email || "",
          bio: profile.bio || "",
          website: profile.website || "",
          experience: profile.experience ?? 0,
          role: profile.role || "",
          gitLink: profile.gitLink || "",
          instaLink: profile.instaLink || "",
          linkedinLink: profile.linkedinLink || "",
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
          image: "",
          name: "",
          email: "",
          bio: "",
          website: "",
          experience: 0,
          role: "",
          gitLink: "",
          instaLink: "",
          linkedinLink: "",
        };
      }
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
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
        className="w-full max-w-xl  p-2  space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your name"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your image url"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormDescription>
                This is your public display proile image.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your email"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  disabled
                />
              </FormControl>
              <FormDescription>Your email cannot be changed.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your role"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormDescription>This is your role</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your bio"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormDescription>
                A short description about yourself.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Years of experience"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormDescription>
                Your professional experience in years.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your website URL"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormDescription>
                Your personal or professional website.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gitLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your github URL"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormDescription> Your Github Handle url</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="linkedinLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Linkedin</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your Linkedin URL"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormDescription>Your Linkedin Handle url.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="instaLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Insta</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your Insta URL"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormDescription>Your Insta Handle url.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
