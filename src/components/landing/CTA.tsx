import React from 'react';
import { Button } from '@/components/ui/button';

export const CTA = () => {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
            Ready to Start Your Writing Journey?
          </h2>
          <p className="text-lg text-blue-100 mb-10">
            Join thousands of writers who are already sharing their stories. No
            credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100 text-base px-8 h-12 w-full sm:w-auto"
            >
              Create Your Blog
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-base px-8 h-12 w-full sm:w-auto"
            >
              View Pricing
            </Button>
          </div>
          <p className="text-sm text-blue-200 mt-6">
            Free forever for personal blogs. Upgrade anytime.
          </p>
        </div>
      </div>
    </section>
  );
};
