import { router } from "./index";
import { postsRouter } from "./routers/posts";
// 1. Import the new categories router
import { categoriesRouter } from "./routers/categories";

export const appRouter = router({
  posts: postsRouter,
  // 2. Add it to the appRouter
  categories: categoriesRouter,
});

export type AppRouter = typeof appRouter;