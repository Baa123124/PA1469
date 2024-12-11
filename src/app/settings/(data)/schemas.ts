import { emailSchema } from "@/lib/authSchemas"
import { z } from "zod"

export const changeEmailSchema = z
  .object({
    newEmail: emailSchema,
    confirmEmail: emailSchema,
  })
  .refine((data) => data.newEmail === data.confirmEmail, {
    message: "Emails must match",
    path: ["confirmEmail"], // This helps highlight the specific field in error messages
  })

export type ChangeEmailSchema = z.infer<typeof changeEmailSchema>
