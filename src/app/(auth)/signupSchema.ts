import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(20, { message: "Password must be at most 20 characters long" })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Password must contain at least one number",
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: "Password must contain at least one special character",
  })
  .refine((password) => !/\s/.test(password), {
    message: "Password must not contain any white spaces",
  });

export const signupSchema = z.object({
  displayName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .refine((name) => name.trim().split(" ").length >= 2, {
      message: "Name must include both first and last name",
    })
    .refine((name) => /^[A-Za-z\s'-]+$/.test(name), {
      message: "Name can only contain letters, spaces, hyphens, or apostrophes",
    }),
  email: z.string().email({ message: "Invalid email address" }), // Email trims automatically
  password: passwordSchema,
});

export type signupSchema = z.infer<typeof signupSchema>;
