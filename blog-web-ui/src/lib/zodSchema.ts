import { z } from "zod";

export const registerFormSchema = z
  .object({
    first_name: z
      .string()
      .min(3, { message: "First name must be at least 3 characters long" }),
    last_name: z
      .string()
      .min(3, { message: "Last name must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    role: z.string().optional(),
    adminSecret: z.string().optional(),
  })
  .refine(
    (data) => (data.role === "ADMIN" ? !!data.adminSecret?.trim() : true),
    {
      message: "Admin secret is required for admin registration.",
      path: ["adminSecret"],
    }
  );

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const editProfileFormSchema = z.object({
  first_name: z
    .string()
    .min(3, { message: "First name must be at least 3 characters long" })
    .optional(),
  last_name: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters long" })
    .optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  bio: z.string().optional(),
});

// export const createBlogFormSchema = z.object({
//   email: z.string().email({ message: "Invalid email address" }),
//   password: z
//     .string()
//     .min(6, { message: "Password must be at least 6 characters long" }),
// });

export const categorySchema = z.object({
  // id: z.string(),
  name: z.string(),
});
export const commentSchema = z.object({
  content: z.string(),
});

export const blogSchema = z.object({
  title: z.string(),
  content: z.string(),
  // coverImage: z.string().optional(),
  coverImage: z.instanceof(File).optional(),
  categories: z.string(categorySchema),
});
