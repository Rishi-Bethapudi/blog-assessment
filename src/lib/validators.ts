import { z } from 'zod';

// Schema for filtering/paginating posts (Req #80, #128)
export const getPostsQuerySchema = z.object({
  categoryId: z.number().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(10),
});

// Schema for creating a post (Req #77, #79)
// Note: We REMOVE 'slug' because the server will generate it.
export const createPostSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  content: z.string().min(10, { message: 'Content is too short' }),
  categoryIds: z.array(z.number()).min(1, { message: 'At least one category is required' }),
});

// Schema for updating a post
export const updatePostSchema = z.object({
  id: z.number(),
  title: z.string().min(3).optional(),
  content: z.string().min(10).optional(),
  published: z.boolean().optional(),
  categoryIds: z.array(z.number()).min(1).optional(),
});

// Schema for creating a category (Req #78)
export const createCategorySchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  description: z.string().optional(),
});

// Schema for updating a category
export const updateCategorySchema = z.object({
  id: z.number(),
  name: z.string().min(2).optional(),
  description: z.string().optional(),
});