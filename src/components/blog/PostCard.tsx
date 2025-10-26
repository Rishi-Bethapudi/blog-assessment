'use client';

import React from 'react';
// import Link from 'next/link'; // Uncomment when running in Next.js
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'; // Relative path
import { Badge } from '../ui/badge'; // Relative path
import { Skeleton } from '../ui/skeleton'; // Relative path

// Define a type that matches the API response
type PostCardProps = {
  post: {
    id: number;
    title: string;
    slug: string;
    content: string; // You might want a 'snippet' field instead
    createdAt: string | Date | null;
    categories: {
      category: {
        id: number;
        name: string;
      };
    }[];
  };
};

export function PostCard({ post }: PostCardProps) {
  const snippet = post.content.substring(0, 100) + '...';
  const publishedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'No date';

  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-xl dark:bg-gray-800">
      <CardHeader>
        <div className="mb-3 flex flex-wrap gap-2">
          {/* Updated to map the nested structure */}
          {post.categories.map((postCat) => (
            <Badge key={postCat.category.id} variant="outline">
              {postCat.category.name}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {/* <Link href={`/post/${post.slug}`} className="hover:underline"> */}
          <a href={`/post/${post.slug}`} className="hover:underline">
            {post.title}
          </a>
          {/* </Link> */}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-base text-gray-600 dark:text-gray-400">
          {snippet}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center text-sm text-gray-500 dark:text-gray-400">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="ml-3">
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {/* You'll add author name later */}
              Blog Author
            </p>
            <time
              dateTime={
                post.createdAt
                  ? post.createdAt instanceof Date
                    ? post.createdAt.toISOString()
                    : post.createdAt
                  : undefined
              }
            >
              {publishedDate}
            </time>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
