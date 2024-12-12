import { emailSchema, passwordSchema } from "@/lib/authSchemas"
import { z } from "zod"

const changeEmailSchema = z
  .object({
    newEmail: emailSchema,
    confirmEmail: emailSchema,
  })
  .refine((data) => data.newEmail === data.confirmEmail, {
    message: "Emails must match",
    path: ["confirmEmail"],
  })

const changePasswordSchema = z
  .object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })

const profileSchema = z.object({
  displayName: z
    .string()
    .min(1, { message: "Display name is required" })
    .max(20, { message: "Display name must be at most 20 characters long" }),
  description: z
    .string()
    .max(200, { message: "Description must be at most 200 characters long" })
    .optional(),
  avatar: z.string().url().optional(),
  banner: z.string().url().optional(),
})

export { changeEmailSchema, changePasswordSchema, profileSchema }
export type ChangeEmailSchema = z.infer<typeof changeEmailSchema>
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>
export type ProfileSchema = z.infer<typeof profileSchema>
