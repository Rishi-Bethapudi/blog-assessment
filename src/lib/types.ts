export type Category = {
  id: number;
  slug: string;
  name: string;
  description: string | null;
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
  published: boolean | null;
  createdAt: Date | null;
  categories: {
    postId: number;
    categoryId: number;
    category: Category;
  }[];
};
