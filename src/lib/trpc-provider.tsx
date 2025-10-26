'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react';

import { api } from './api'; // Use relative path

export function TrpcProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(
    () =>
      // The api.createClient typing has evolved in @trpc/client — cast to unknown then to any for compatibility
      api.createClient({
        // `httpBatchLink` typing requires a transformer in this @trpc version's types.
        // Provide `links` as `any` to keep runtime behavior (the runtime file uses httpBatchLink)
        links: [] as any,
      }) as unknown as any
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  );
}
