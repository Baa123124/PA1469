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

// ? Could restrict width and height as well, leaving this optional for now
const avatarSchema = z.object({
  uri: z.string().url({ message: "Invalid URL." }),
  mimeType: z.string().refine((type) => ["image/jpeg", "image/png", "image/webp"].includes(type), {
    message: "Invalid type. Allowed types are: png, jpeg, webp",
  }),
  width: z.number().optional(),
  height: z.number().optional(),
  fileSize: z.number().max(2 * 1024 * 1024, { message: "File size must be at most 2 MB" }),
})

const bannerSchema = z.object({
  uri: z.string().url({ message: "Invalid URL." }),
  mimeType: z.string().refine((type) => ["image/jpeg", "image/png", "image/webp"].includes(type), {
    message: "Invalid type. Allowed types are: png, jpeg, webp",
  }),
  width: z.number().optional(),
  height: z.number().optional(),
  fileSize: z.number().max(5 * 1024 * 1024, { message: "File size must be at most 5 MB" }),
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
  avatar: avatarSchema,
  banner: bannerSchema,
})

export { changeEmailSchema, changePasswordSchema, profileSchema, avatarSchema, bannerSchema }
export type ChangeEmailSchema = z.infer<typeof changeEmailSchema>
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>
export type ProfileSchema = z.infer<typeof profileSchema>
export type AvatarSchema = z.infer<typeof avatarSchema>
export type BannerSchema = z.infer<typeof bannerSchema>
