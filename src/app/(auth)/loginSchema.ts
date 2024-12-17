import { z } from "zod"
import { passwordSchema } from "./signupSchema"

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }), // email trims automatically
  password: passwordSchema,
})

export type loginSchema = z.infer<typeof loginSchema>
