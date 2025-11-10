// src/app/(public)/posts/page.tsx
'use client';

import { useState, useEffect } from 'react';
import PostCard from '@/components/posts/PostCard';
import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Placeholder data
const PLACEHOLDER_POSTS = [
  {
    id: 1,
    title: 'Getting Started with Next.js 15',
    excerpt:
      'Learn the fundamentals of Next.js 15 and build modern web applications with the latest features and improvements.',
    category: 'Tutorial',
    author: 'Sarah Johnson',
    date: '2025-10-15',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Mastering Tailwind CSS',
    excerpt:
      'Discover advanced techniques and best practices for building beautiful user interfaces with Tailwind CSS.',
    category: 'Design',
    author: 'Michael Chen',
    date: '2025-10-12',
    readTime: '8 min read',
    image:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'React Server Components Explained',
    excerpt:
      'A deep dive into React Server Components and how they revolutionize data fetching in modern applications.',
    category: 'Tutorial',
    author: 'Emily Rodriguez',
    date: '2025-10-10',
    readTime: '12 min read',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'Building Accessible Web Apps',
    excerpt:
      'Essential accessibility practices every developer should know to create inclusive web experiences.',
    category: 'Best Practices',
    author: 'David Kim',
    date: '2025-10-08',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
  },
  {
    id: 5,
    title: 'The Future of Web Development',
    excerpt:
      'Explore emerging trends and technologies that are shaping the future of web development.',
    category: 'Industry',
    author: 'Sarah Johnson',
    date: '2025-10-05',
    readTime: '10 min read',
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop',
  },
  {
    id: 6,
    title: 'TypeScript Tips & Tricks',
    excerpt:
      'Level up your TypeScript skills with these advanced patterns and productivity tips.',
    category: 'Tutorial',
    author: 'Michael Chen',
    date: '2025-10-01',
    readTime: '7 min read',
    image:
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
  },
];

const CATEGORIES = ['All', 'Tutorial', 'Design', 'Best Practices', 'Industry'];

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <Loader2
          className="h-12 w-12 animate-spin mx-auto mb-4"
          style={{ color: 'var(--color-primary)' }}
        />
        <p className="text-muted-foreground">Loading posts...</p>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center max-w-md">
        <div className="mb-4 text-6xl">📝</div>
        <h3 className="text-2xl font-semibold mb-2">No posts found</h3>
        <p className="text-muted-foreground">
          No posts match your selected category. Try selecting a different
          filter.
        </p>
      </div>
    </div>
  );
}

export default function PostsPage() {
  const [posts, setPosts] = useState<typeof PLACEHOLDER_POSTS>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Simulate API fetch
    const fetchPosts = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setPosts(PLACEHOLDER_POSTS);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const filteredPosts =
    selectedCategory === 'All'
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog Posts</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our latest articles, tutorials, and insights on web
            development, design, and technology.
          </p>
        </div>

        {/* Filter */}
        <div className="mb-8 flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            Filter by:
          </span>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingState />
        ) : filteredPosts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
