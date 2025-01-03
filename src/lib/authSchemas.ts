import { z } from "zod"

/**
 * Schema for validating passwords.
 *
 * Requirements:
 * - Minimum length: 8 characters
 * - Maximum length: 20 characters
 * - Must contain at least one uppercase letter
 * - Must contain at least one lowercase letter
 * - Must contain at least one number
 * - Must contain at least one special character (!@#$%^&*)
 * - Must not contain any white spaces
 */
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

/**
 * Schema for validating email addresses.
 *
 * Requirements:
 * - Must be a valid email address
 */
export const emailSchema = z.string().email({ message: "Invalid email address" }) // email trims automatically

/**
 * Schema for validating display names.
 *
 * Requirements:
 * - Minimum length: 3 characters
 * - Maximum length: 20 characters
 * - Must include both first and last name
 */
export const displayNameSchema = z
  .string()
  .min(3, { message: "Name must be at least 3 characters long" })
  .max(20, { message: "Name must be at most 20 characters long" })
  .refine((name) => name.trim().split(" ").length >= 2, {
    message: "Name must include both first and last name",
  })

/**
 * Schema for validating authentication details.
 *
 * Fields:
 * - `email`: Validated by `emailSchema`
 * - `password`: Validated by `passwordSchema`
 */
export const authSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

/**
 * Schema for validating registration details.
 *
 * Fields:
 * - `displayName`: Validated by `displayNameSchema`
 * - `email`: Validated by `emailSchema`
 * - `password`: Validated by `passwordSchema`
 */
export const registerSchema = z.object({
  displayName: displayNameSchema,
  email: emailSchema,
  password: passwordSchema,
})

export type PasswordSchema = z.infer<typeof passwordSchema>
export type EmailSchema = z.infer<typeof emailSchema>
export type AuthSchema = z.infer<typeof authSchema>
export type RegisterSchema = z.infer<typeof registerSchema>
