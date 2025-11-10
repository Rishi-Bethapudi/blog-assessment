// src/components/posts/PostCard.tsx
import Link from 'next/link';
import { Calendar, Clock, User } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PostCardProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    image: string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link href={`/posts/${post.id}`} className="group">
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 border-2">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <Badge
            className="absolute top-3 right-3"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'white',
            }}
          >
            {post.category}
          </Badge>
        </div>

        {/* Content */}
        <CardHeader className="pb-3">
          <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
        </CardHeader>

        <CardContent className="pb-4">
          <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
        </CardContent>

        {/* Footer */}
        <CardFooter className="pt-0 flex flex-col gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-4 w-full">
            <div className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readTime}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 w-full">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formattedDate}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
