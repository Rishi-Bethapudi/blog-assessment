import Link from 'next/link';
import { PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTA() {
  return (
    <section className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Ready to Start Writing?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Join thousands of writers sharing their stories. Create your first
            post in minutes.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 text-base px-8 py-6 text-lg"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'white',
            }}
          >
            <Link href="/dashboard/posts/new">
              <PenLine className="mr-2 h-5 w-5" />
              Create Your First Post
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
