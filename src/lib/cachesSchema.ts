import { z } from "zod"

const newListSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 character long" })
    .max(20, { message: "Name must be at most 20 characters long" }),
})

const editListSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 character long" })
    .max(20, { message: "Name must be at most 20 characters long" }),
})

export { newListSchema, editListSchema }
export type NewListSchema = z.infer<typeof newListSchema>
export type EditListSchema = z.infer<typeof editListSchema>
