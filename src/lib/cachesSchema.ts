import { z } from "zod"

/**
 * Schema for validating the creation of a new list.
 *
 * Fields:
 * - `name`: A string that:
 *   - Must be at least 1 character long.
 *   - Must be at most 20 characters long.
 */
const newListSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 character long" })
    .max(20, { message: "Name must be at most 20 characters long" }),
})

/**
 * Schema for validating edits to an existing list.
 *
 * Fields:
 * - `name`: A string that:
 *   - Must be at least 1 character long.
 *   - Must be at most 20 characters long.
 */
const editListSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 character long" })
    .max(20, { message: "Name must be at most 20 characters long" }),
})

export { newListSchema, editListSchema }
export type NewListSchema = z.infer<typeof newListSchema>
export type EditListSchema = z.infer<typeof editListSchema>
