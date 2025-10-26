'use client';

import { trpc } from '@/lib/utils';

export default function HomePage() {
  const { data, isLoading } = trpc.posts.getAll.useQuery();

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      {data?.map((post) => (
        <div key={post.id} className="border-b py-2">
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p className="text-sm text-gray-600">{post.content}</p>
        </div>
      ))}
    </div>
  );
}
