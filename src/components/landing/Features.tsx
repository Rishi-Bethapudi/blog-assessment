import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BookOpen, Users, Zap, TrendingUp } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Beautiful Editor',
      description:
        'Write with a distraction-free, intuitive editor designed for long-form content. Markdown support included.',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Build Your Audience',
      description:
        'Connect with readers who share your interests. Grow your following with built-in discovery features.',
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Lightning Fast',
      description:
        'Optimized for speed and performance. Your readers get instant page loads every time.',
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Analytics Dashboard',
      description:
        'Track your growth with detailed insights about views, engagement, and reader demographics.',
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Everything You Need to Blog
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features that help you focus on what matters most—creating
            great content.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
