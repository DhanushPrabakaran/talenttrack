"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Schema for form validation
const loginSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  rollNumber: z.string().min(4, "Roll number must be at least 4 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Page: React.FC = () => {
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(""); // Reset error state first

    // Call NextAuth signIn with credentials
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      name: data.name,
      rollNumber: data.rollNumber,
      redirect: false,
    });

    reset();

    // Check if result returned an error
    if (result?.error) {
      console.log(result.error);
      setError(result.error);
    } else if (result?.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex justify-center flex-grow h-screen items-center">
      {/* Background Image */}
      <div className="bg-cover bg-[url('../public/illustrations/Team.png')] w-full h-full max-md:hidden"></div>

      {/* Form Section */}
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="w-[400px] p-4 shadow-lg rounded-lg bg-white">
          <h1 className="text-3xl text-center font-bold">
            Talent<span className="text-green-400">Track</span>
          </h1>
          <p className="text-sm text-center text-gray-500 mb-4">
            Sign in with your credentials
          </p>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="mb-2">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="rollNumber">Roll Number</Label>
              <Input
                id="rollNumber"
                {...register("rollNumber")}
                placeholder="Enter your roll number"
              />
              {errors.rollNumber && (
                <p className="text-red-500 text-sm">
                  {errors.rollNumber.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
