import { object, string, number, literal } from "zod";

export const signInSchema = object({
  name: string().min(2, "Name must be at least 2 characters"),
  rollNumber: string().min(4, "Roll number must be at least 4 characters"),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const StudentFormSchema = object({
  name: string().min(2, "Name must be at least 2 characters"),
  email: string().email("Invalid email address"),
  bio: string().optional(),
  website: string().url().optional().or(literal("")),
  image: string().url().optional().or(literal("")),
  gitLink: string().url().optional().or(literal("")),
  linkedinLink: string().url().optional().or(literal("")),
  leetCodeLink: string().url().optional().or(literal("")),
  codeStudioLink: string().url().optional().or(literal("")),
  geeksForGeeksLink: string().url().optional().or(literal("")),
  interviewBitLink: string().url().optional().or(literal("")),
  codeChefLink: string().url().optional().or(literal("")),
  codeForcesLink: string().url().optional().or(literal("")),
  hackerRankLink: string().url().optional().or(literal("")),
  solvedQuestions: number().optional(),
  resume: string().url().optional().or(literal("")),
  age: number().optional(),
  department: string().optional(),
  degree: string().optional(),
  marks10th: number().optional(),
  marks12th: number().optional(),
  marksDegree: number().optional(),
});

export const experienceSchema = object({
  role: string().min(1, "Role is required"),
  company: string().min(1, "Company is required"),
  start: string().refine(
    (val) => !isNaN(new Date(val).getTime()),
    "Invalid date format"
  ),
  end: string().refine(
    (val) => !isNaN(new Date(val).getTime()),
    "Invalid date format"
  ),
  description: string().min(1, "Description is required"),
});
