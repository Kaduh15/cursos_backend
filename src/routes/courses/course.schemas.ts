import { z } from 'zod'

export const createCourseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  duration: z.number().min(1, 'Duration is required'),
  imageUrl: z.url('Invalid image URL'),
  status: z.boolean().optional(),
})

export type CreateCourseSchema = z.infer<typeof createCourseSchema>

export const updateCourseSchema = createCourseSchema.partial()

export type UpdateCourseSchema = z.infer<typeof updateCourseSchema>
