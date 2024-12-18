import { z } from "zod"

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
  })

export const emailSchema = z.string().email({ message: "Invalid email address" }) // email trims automatically

export const authSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export type PasswordSchema = z.infer<typeof passwordSchema>
export type EmailSchema = z.infer<typeof emailSchema>
export type AuthSchema = z.infer<typeof authSchema>
