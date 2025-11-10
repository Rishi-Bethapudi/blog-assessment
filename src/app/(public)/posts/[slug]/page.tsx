import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MarkdownRenderer from '@/components/posts/MarkdownRenderer';

// Placeholder posts database (temporary until tRPC)
const PLACEHOLDER_POSTS = {
  '1': {
    id: 1,
    title: 'Getting Started with Next.js 15',
    category: 'Tutorial',
    author: 'Sarah Johnson',
    date: '2025-10-15',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop',
    content: `# Introduction

This is a placeholder post about Next.js 15 features...
`,
  },
  '2': {
    id: 2,
    title: 'Mastering Tailwind CSS',
    category: 'Design',
    author: 'Michael Chen',
    date: '2025-10-12',
    readTime: '8 min read',
    image:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&h=600&fit=crop',
    content: `# Mastering Tailwind CSS

Placeholder markdown article for Tailwind best practices...
`,
  },
};

// ✅ SEO Metadata per post
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = PLACEHOLDER_POSTS[params.slug as keyof typeof PLACEHOLDER_POSTS];

  return {
    title: post?.title ?? 'Post Not Found',
    description: post?.content?.slice(0, 150) ?? 'Blog post',
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = PLACEHOLDER_POSTS[params.slug as keyof typeof PLACEHOLDER_POSTS];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mb-4 text-6xl">📭</div>
          <h2 className="text-2xl font-semibold mb-2">Post Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The post you're looking for doesn't exist.
          </p>
          <Button asChild>
            <a href="/posts">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Posts
            </a>
          </Button>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Button variant="ghost" asChild className="mb-4">
          <a href="/posts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Posts
          </a>
        </Button>
      </div>

      {/* Hero Image */}
      <div className="w-full h-64 md:h-96 overflow-hidden bg-muted">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Wrapper */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <Badge
              className="mb-4"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white',
              }}
            >
              {post.category}
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </header>

          {/* Markdown Article */}
          <MarkdownRenderer content={post.content} />
        </div>
      </div>
    </article>
  );
}
