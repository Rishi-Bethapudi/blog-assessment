import { z } from "zod";
import { db, schema } from "@/server/db";
import { publicProcedure, router } from "../index";
import { eq } from "drizzle-orm";

export const postsRouter = router({
  getAll: publicProcedure.query(async () => {
    return await db.select().from(schema.posts);
  }),

  create: publicProcedure
    .input(z.object({
      title: z.string().min(3),
      content: z.string().min(10),
      slug: z.string().min(3),
    }))
    .mutation(async ({ input }) => {
      await db.insert(schema.posts).values(input);
      return { success: true };
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.delete(schema.posts).where(eq(schema.posts.id, input.id));
      return { success: true };
    }),
});
