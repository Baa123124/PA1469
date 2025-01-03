import { passwordSchema, emailSchema } from "@/lib/authSchemas"
import { z } from "zod"

/**
 * Schema for validating a request to change an email address.
 *
 * Fields:
 * - `newEmail`: The new email address, validated using `emailSchema`.
 * - `confirmEmail`: Confirmation of the new email address, validated using `emailSchema`.
 *
 * Additional Rules:
 * - `newEmail` and `confirmEmail` must match.
 */
const changeEmailSchema = z
  .object({
    newEmail: emailSchema,
    confirmEmail: emailSchema,
  })
  .refine((data) => data.newEmail === data.confirmEmail, {
    message: "Emails must match",
    path: ["confirmEmail"],
  })

/**
 * Schema for validating a request to change a password.
 *
 * Fields:
 * - `currentPassword`: The current password, validated using `passwordSchema`.
 * - `newPassword`: The new password, validated using `passwordSchema`.
 * - `confirmPassword`: Confirmation of the new password, validated using `passwordSchema`.
 *
 * Additional Rules:
 * - `newPassword` and `confirmPassword` must match.
 */
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
/**
 * Schema for validating an avatar image upload.
 *
 * Fields:
 * - `uri`: The URI of the image, which must be a valid URL.
 * - `mimeType`: The MIME type of the image, which must be one of: `image/jpeg`, `image/png`, or `image/webp`.
 * - `width`: (Optional) The width of the image in pixels.
 * - `height`: (Optional) The height of the image in pixels.
 * - `fileSize`: The file size in bytes, which must not exceed 2 MB.
 */
const avatarSchema = z.object({
  uri: z.string().url({ message: "Invalid URL." }),
  mimeType: z.string().refine((type) => ["image/jpeg", "image/png", "image/webp"].includes(type), {
    message: "Invalid type. Allowed types are: png, jpeg, webp",
  }),
  width: z.number().optional(),
  height: z.number().optional(),
  fileSize: z.number().max(2 * 1024 * 1024, { message: "File size must be at most 2 MB" }),
})

/**
 * Schema for validating a banner image upload.
 *
 * Fields:
 * - `uri`: The URI of the image, which must be a valid URL.
 * - `mimeType`: The MIME type of the image, which must be one of: `image/jpeg`, `image/png`, or `image/webp`.
 * - `width`: (Optional) The width of the image in pixels.
 * - `height`: (Optional) The height of the image in pixels.
 * - `fileSize`: The file size in bytes, which must not exceed 5 MB.
 */
const bannerSchema = z.object({
  uri: z.string().url({ message: "Invalid URL." }),
  mimeType: z.string().refine((type) => ["image/jpeg", "image/png", "image/webp"].includes(type), {
    message: "Invalid type. Allowed types are: png, jpeg, webp",
  }),
  width: z.number().optional(),
  height: z.number().optional(),
  fileSize: z.number().max(5 * 1024 * 1024, { message: "File size must be at most 5 MB" }),
})

/**
 * Schema for validating a user profile.
 *
 * Fields:
 * - `displayName`: A string representing the display name, which must be between 1 and 20 characters long.
 * - `description`: (Optional) A string representing the user's description, which must not exceed 200 characters.
 * - `avatar`: Validated using `avatarSchema`.
 * - `banner`: Validated using `bannerSchema`.
 */
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

/**
 * Schema for validating cache range settings.
 *
 * Fields:
 * - `minRange`: A number coerced from input, representing the minimum range in kilometers, which must be between 0 and 10.
 * - `maxRange`: A number coerced from input, representing the maximum range in kilometers, which must be between 1 and 10.
 *
 * Additional Rules:
 * - `maxRange` must be greater than or equal to `minRange`.
 */
const cacheRangeSchema = z
  .object({
    minRange: z.coerce
      .number()
      .min(0, { message: "Min range must be at least 0 km" })
      .max(10, { message: "Max range must be at most 10 km" }),
    maxRange: z.coerce
      .number()
      .min(1, { message: "Max range must be at least 1 km" })
      .max(10, { message: "Max range must be at most 10 km" }),
  })
  .refine((data) => data.minRange <= data.maxRange, {
    message: "Max range must be greater than or equal to min range",
    path: ["maxRange"],
  })

/**
 * Schema for validating theme settings.
 *
 * Fields:
 * - `theme`: An enumeration value representing the theme, which must be one of: `light`, `dark`, or `system`.
 */
const themeSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
})

export {
  changeEmailSchema,
  changePasswordSchema,
  profileSchema,
  avatarSchema,
  bannerSchema,
  cacheRangeSchema,
  themeSchema,
}
export type ChangeEmailSchema = z.infer<typeof changeEmailSchema>
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>
export type ProfileSchema = z.infer<typeof profileSchema>
export type AvatarSchema = z.infer<typeof avatarSchema>
export type BannerSchema = z.infer<typeof bannerSchema>
export type CacheRangeSchema = z.infer<typeof cacheRangeSchema>
export type ThemeSchema = z.infer<typeof themeSchema>
