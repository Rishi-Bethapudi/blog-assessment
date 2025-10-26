import React from 'react';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 mb-8">
            <Zap className="mr-2 h-4 w-4" />
            Launch your blog in minutes
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl mb-6">
            Share Your Stories
            <span className="block text-blue-600 mt-2">With the World</span>
          </h1>
          <p className="text-lg text-gray-600 sm:text-xl max-w-2xl mx-auto mb-10">
            Create, publish, and grow your blog with our powerful platform.
            Built for writers, readers, and everyone in between.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-base px-8 h-12 w-full sm:w-auto"
            >
              Start Writing Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 h-12 w-full sm:w-auto"
            >
              View Demo
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-gray-900">50K+</div>
              <div className="text-sm text-gray-600 mt-1">Active Writers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">2M+</div>
              <div className="text-sm text-gray-600 mt-1">Monthly Readers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">100K+</div>
              <div className="text-sm text-gray-600 mt-1">
                Stories Published
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
