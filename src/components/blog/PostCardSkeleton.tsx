'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * PostCardSkeleton Component
 * A loading placeholder with the same shape as the PostCard.
 */
export function PostCardSkeleton() {
  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-lg dark:bg-gray-800">
      <CardHeader>
        <div className="mb-3 flex flex-wrap gap-2">
          <Skeleton className="h-5 w-20 rounded-md" />
          <Skeleton className="h-5 w-24 rounded-md" />
        </div>
        <Skeleton className="h-6 w-3/4 rounded-md" />
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-2/3 rounded-md" />
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="ml-3 space-y-2">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-20 rounded-md" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
