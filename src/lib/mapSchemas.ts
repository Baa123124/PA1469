import { z } from "zod"

const photoSchema = z.object({
  uri: z.string().url({ message: "Invalid URL" }),
  mimeType: z.string().refine((type) => ["image/jpeg", "image/png", "image/webp"].includes(type), {
    message: "Invalid type. Allowed types are: png, jpeg, webp",
  }),
  width: z.number().optional(),
  height: z.number().optional(),
  fileSize: z.number().max(5 * 1024 * 1024, { message: "File size must be at most 5 MB" }),
})

const reviewCacheSchema = z.object({
  rating: z.number().min(1, { message: "Rating must be at least 1" }).max(5),
  comment: z
    .string()
    .max(200, { message: "Comment must be at most 200 characters long" })
    .optional(),
  photo: z.union([
    photoSchema,
    z.object({
      uri: z.literal(""),
      mimeType: z.literal(""),
      width: z.literal(0),
      height: z.literal(0),
      fileSize: z.literal(0),
    }),
  ]),
})

const newCacheSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 character long" })
    .max(20, { message: "Name must be at most 20 characters long" }),
  description: z
    .string()
    .min(1, { message: "Description must be at least 1 character long" })
    .max(200, { message: "Description must be at most 200 characters long" }),
  photo: z.union([
    photoSchema,
    z.object({
      uri: z.literal(""),
      mimeType: z.literal(""),
      width: z.literal(0),
      height: z.literal(0),
      fileSize: z.literal(0),
    }),
  ]),
  // tags: z.array(z.string()).optional(),
})

const saveCacheSchema = z.object({
  lists: z.record(z.string(), z.boolean().default(false)),
})

export { reviewCacheSchema, photoSchema, saveCacheSchema, newCacheSchema }
export type ReviewCacheSchema = z.infer<typeof reviewCacheSchema>
export type PhotoSchema = z.infer<typeof photoSchema>
export type SaveCacheSchema = z.infer<typeof saveCacheSchema>
export type NewCacheSchema = z.infer<typeof newCacheSchema>
