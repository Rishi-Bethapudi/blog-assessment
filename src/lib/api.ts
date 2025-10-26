/**
 * This is the tRPC client setup for your React frontend.
 * It's what allows you to call your tRPC API in a type-safe way from
 * your components.
 */
'use client';

import { createTRPCReact } from '@trpc/react-query';
import { type AppRouter } from '@/server/trpc/router'; // Adjust path if needed

/**
 * Create the tRPC client.
 * This `api` object is what you'll use in your components, e.g.:
 * `api.post.getAll.useQuery()`
 */
export const api = createTRPCReact<AppRouter>();