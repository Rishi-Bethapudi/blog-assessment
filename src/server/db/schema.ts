import { pgTable, serial, text, boolean, timestamp, primaryKey, integer } from "drizzle-orm/pg-core";
// Import 'relations'
import { relations } from "drizzle-orm";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  slug: text("slug").notNull().unique(),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relation for posts: a post can have many categories
export const postsRelations = relations(posts, ({ many }) => ({
  categories: many(postCategories),
}));

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
});

// Relation for categories: a category can have many posts
export const categoriesRelations = relations(categories, ({ many }) => ({
  posts: many(postCategories),
}));

export const postCategories = pgTable("post_categories", {
  // Use 'integer' to match 'serial' and add references
  postId: integer("post_id").notNull().references(() => posts.id, { onDelete: 'cascade' }),
  categoryId: integer("category_id").notNull().references(() => categories.id, { onDelete: 'cascade' }),
}, (t) => ({
  // Add a composite primary key
  pk: primaryKey({ columns: [t.postId, t.categoryId] }),
}));

// Relations for the junction table
export const postCategoriesRelations = relations(postCategories, ({ one }) => ({
  post: one(posts, {
    fields: [postCategories.postId],
    references: [posts.id],
  }),
  category: one(categories, {
    fields: [postCategories.categoryId],
    references: [categories.id],
  }),
}));