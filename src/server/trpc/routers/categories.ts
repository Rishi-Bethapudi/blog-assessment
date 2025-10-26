import { z } from "zod";
import { db, schema } from "@/server/db";
import { publicProcedure, router } from "../index";
import { eq, desc } from "drizzle-orm";
import { slugify } from "@/lib/utils";
import { createCategorySchema, updateCategorySchema } from "@/lib/validators";

export const categoriesRouter = router({
  // GET ALL Categories
  getAll: publicProcedure.query(async () => {
    return await db.query.categories.findMany({
      orderBy: [desc(schema.categories.name)],
    });
  }),

  // CREATE Category (Req #78)
  create: publicProcedure
    .input(createCategorySchema)
    .mutation(async ({ input }) => {
      const slug = slugify(input.name);
      const newCategory = await db
        .insert(schema.categories)
        .values({ ...input, slug })
        .returning();
      return newCategory[0];
    }),

  // UPDATE Category
  update: publicProcedure
    .input(updateCategorySchema)
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      let newSlug: string | undefined = undefined;
      if (data.name) {
        newSlug = slugify(data.name);
      }
      
      const updatedCategory = await db
        .update(schema.categories)
        .set({ ...data, slug: newSlug })
        .where(eq(schema.categories.id, id))
        .returning();
      return updatedCategory[0];
    }),
  
  // DELETE Category
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.delete(schema.categories).where(eq(schema.categories.id, input.id));
      return { success: true };
    }),
});