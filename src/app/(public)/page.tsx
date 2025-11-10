import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import CTA from '@/components/landing/CTA';

export default function HomePage() {
  return (
    <main className="flex-1">
      <Hero />
      <Features />
      <CTA />
    </main>
  );
}
