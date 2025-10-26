import { z } from "zod";
import { db, schema } from "@/server/db";
import { publicProcedure, router } from "../index";
// 1. Import 'inArray' here
import { eq, desc, inArray } from "drizzle-orm";
import { slugify } from "@/lib/utils";
import { createPostSchema, updatePostSchema, getPostsQuerySchema } from "@/lib/validators";
import { TRPCError } from "@trpc/server";

export const postsRouter = router({
  // GET ALL Posts (with filtering and pagination) (Req #80, #128)
  getAll: publicProcedure
    .input(getPostsQuerySchema)
    .query(async ({ input }) => {
      const { page, limit, categoryId } = input;

      // 2. This is the corrected subquery logic
      // First, create the subquery to find all post IDs that match the category
      const subQuery = db
        .select({ postId: schema.postCategories.postId })
        .from(schema.postCategories)
        .where(eq(schema.postCategories.categoryId, categoryId!)); // The ! is safe because of the check below

      // 3. Now, build the main query
      const posts = await db.query.posts.findMany({
        // 4. The 'where' clause is now correct.
        // 'posts' is the table, '{ inArray }' destructures the operators
        where: (posts, { inArray }) =>
          categoryId
            // 5. Use the 'inArray' operator on the 'posts.id' column
            ? inArray(posts.id, subQuery)
            : undefined, // If no categoryId, this is undefined and we get all posts

        orderBy: [desc(schema.posts.createdAt)],
        limit: limit,
        offset: (page - 1) * limit,
        with: {
          // This uses the relations we defined in schema.ts
          categories: {
            with: {
              category: true,
            },
          },
        },
      });
      
      // TODO: Get real total count for pagination
      const totalPosts = 100; // Placeholder
      const totalPages = Math.ceil(totalPosts / limit);

      return { posts, totalPages };
    }),

  // GET ONE Post by Slug
  getOneBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const post = await db.query.posts.findFirst({
        where: eq(schema.posts.slug, input.slug),
        with: {
          categories: {
            with: {
              category: true,
            },
          },
        },
      });

      if (!post) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      }
      return post;
    }),

  // CREATE Post (with category linking) (Req #77, #79, #82)
  create: publicProcedure
    .input(createPostSchema)
    .mutation(async ({ input }) => {
      const { title, content, categoryIds } = input;
      const slug = slugify(title);

      // Use a transaction to create the post AND its category links
      return await db.transaction(async (tx) => {
        const newPost = await tx
          .insert(schema.posts)
          .values({ title, content, slug, published: false }) // (#114) Draft by default
          .returning();
        
        const postId = newPost[0].id;

        const categoriesToLink = categoryIds.map((catId) => ({
          postId: postId,
          categoryId: catId,
        }));

        await tx.insert(schema.postCategories).values(categoriesToLink);

        return newPost[0];
      });
    }),

  // UPDATE Post (with category linking)
  update: publicProcedure
    .input(updatePostSchema)
    .mutation(async ({ input }) => {
      const { id, title, content, published, categoryIds } = input;
      
      return await db.transaction(async (tx) => {
        let newSlug: string | undefined = undefined;
        if (title) {
          newSlug = slugify(title);
        }

        const updatedPost = await tx
          .update(schema.posts)
          .set({ title, content, published, slug: newSlug })
          .where(eq(schema.posts.id, id))
          .returning();
        
        // If categories were provided, update them
        if (categoryIds) {
          // 1. Delete old links
          await tx.delete(schema.postCategories).where(eq(schema.postCategories.postId, id));

          // 2. Create new links
          const categoriesToLink = categoryIds.map((catId) => ({
            postId: id,
            categoryId: catId,
          }));
          await tx.insert(schema.postCategories).values(categoriesToLink);
        }

        return updatedPost[0];
      });
    }),

  // DELETE Post
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.delete(schema.posts).where(eq(schema.posts.id, input.id));
      // Note: postCategories links are deleted automatically via 'onDelete: cascade'
      return { success: true };
    }),
});