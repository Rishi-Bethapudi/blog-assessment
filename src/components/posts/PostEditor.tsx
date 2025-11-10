'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface PostEditorProps {
  initialValues?: {
    title?: string;
    slug?: string;
    content?: string;
    category?: string;
  };
  categories?: string[];
  onSubmit: (data: {
    title: string;
    slug: string;
    content: string;
    category: string;
  }) => Promise<void> | void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export default function PostEditor({
  initialValues,
  categories = ['Tutorial', 'Design', 'Tech', 'News'], // fallback
  onSubmit,
  onCancel,
  isSubmitting = false,
}: PostEditorProps) {
  const [title, setTitle] = useState(initialValues?.title ?? '');
  const [slug, setSlug] = useState(initialValues?.slug ?? '');
  const [content, setContent] = useState(initialValues?.content ?? '');
  const [category, setCategory] = useState(initialValues?.category ?? '');

  // Auto generate slug from title
  useEffect(() => {
    if (!initialValues?.slug) {
      setSlug(
        title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
      );
    }
  }, [title, initialValues?.slug]);

  const handleSubmit = () => {
    onSubmit({
      title,
      slug,
      content,
      category,
    });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col space-y-2">
        <Label>Title</Label>
        <Input
          placeholder="Enter post title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Slug */}
      <div className="flex flex-col space-y-2">
        <Label>Slug</Label>
        <Input
          placeholder="auto-generated..."
          value={slug}
          onChange={(e) => setSlug(e.target.value.toLowerCase())}
        />
        <p className="text-xs text-muted-foreground">
          This will be used in the URL: <strong>/posts/{slug}</strong>
        </p>
      </div>

      {/* Category */}
      <div className="flex flex-col space-y-2">
        <Label>Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Markdown Content */}
      <div className="flex flex-col space-y-2">
        <Label>Content (Markdown)</Label>
        <Textarea
          className="min-h-[300px]"
          placeholder="Write your markdown content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <Button
          className={cn(
            'px-6 text-white',
            'bg-[var(--color-primary)] hover:opacity-90'
          )}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'Save Post'
          )}
        </Button>

        <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
