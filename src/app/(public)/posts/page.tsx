'use client';

import * as React from 'react';
import { api } from '../../../lib/api';
import { type Post, type Category } from '../../../lib/types';

// --- Reusable Components ---
import { PostCard } from '../../../components/blog/PostCard';
import { PostCardSkeleton } from '../../../components/blog/PostCardSkeleton';

// --- shadcn/ui Imports ---
import { Button } from '../../../components/ui/button';
import { Skeleton } from '../../../components/ui/skeleton';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '../../../components/ui/alert';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../components/ui/pagination';
import { AlertCircle } from 'lucide-react';

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(
    null
  );
  const [currentPage, setCurrentPage] = React.useState(1);

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = api.categories.getAll.useQuery();

  const {
    data: postsData,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = api.posts.getAll.useQuery({
    categoryId: selectedCategory ?? undefined,
    page: currentPage,
    limit: 9,
  });

  const isLoading = isLoadingCategories || isLoadingPosts;
  const isError = isErrorCategories || isErrorPosts;

  const totalPages = postsData?.totalPages ?? 1;

  const handleCategoryClick = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Recent blog posts
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Stay up to date with the latest insights and articles.
        </p>
      </header>

      <nav className="mb-10 flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? 'default' : 'outline'}
          onClick={() => handleCategoryClick(null)}
          className="rounded-full"
        >
          All blog posts
        </Button>
        {isLoadingCategories && (
          <>
            <Skeleton className="h-9 w-24 rounded-full" />
            <Skeleton className="h-9 w-32 rounded-full" />
            <Skeleton className="h-9 w-28 rounded-full" />
          </>
        )}
        {categories?.map((category: Category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            onClick={() => handleCategoryClick(category.id)}
            className="rounded-full"
          >
            {category.name}
          </Button>
        ))}
      </nav>

      {isError && (
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load blog posts. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}

        {!isLoading &&
          !isError &&
          postsData?.posts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
      </div>

      {!isLoading && !isError && totalPages > 1 && (
        <footer className="mt-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                  aria-disabled={currentPage === 1}
                  className={
                    currentPage === 1 ? 'pointer-events-none text-gray-400' : ''
                  }
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                  aria-disabled={currentPage === totalPages}
                  className={
                    currentPage === totalPages
                      ? 'pointer-events-none text-gray-400'
                      : ''
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </footer>
      )}
    </div>
  );
}
