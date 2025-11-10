import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Share Your Stories with{' '}
            <span
              className="inline-block"
              style={{ color: 'var(--color-primary)' }}
            >
              the World
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl md:text-2xl">
            A modern blogging platform designed for writers who want to focus on
            creating great content. Simple, elegant, and powerful.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="text-base"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white',
              }}
            >
              <Link href="/posts">
                Explore Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative blur elements */}
      <div
        className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />
    </section>
  );
}
