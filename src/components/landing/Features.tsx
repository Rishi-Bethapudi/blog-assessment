import { Zap, Shield, Palette } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Built with Next.js 15 for optimal performance and instant page loads. Your readers will love the experience.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description:
      'Enterprise-grade security with automatic backups. Focus on writing while we handle the technical details.',
  },
  {
    icon: Palette,
    title: 'Beautiful Design',
    description:
      'Stunning themes that adapt to light and dark modes. Your content looks amazing on every device.',
  },
];

export default function Features() {
  return (
    <section className="py-20 md:py-28 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything You Need to Blog
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features that make blogging a joy, not a chore
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="border-2 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <CardContent className="pt-8 pb-8 px-6">
                  <div
                    className="mb-4 inline-flex rounded-lg p-3"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      opacity: 0.1,
                    }}
                  >
                    <Icon
                      className="h-6 w-6"
                      style={{ color: 'var(--color-primary)' }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
