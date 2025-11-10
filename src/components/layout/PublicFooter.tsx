import Link from 'next/link';
import { Github, Globe } from 'lucide-react';

const socialLinks = [
  {
    href: 'https://github.com',
    icon: Github,
    label: 'GitHub',
  },
  {
    href: 'https://example.com',
    icon: Globe,
    label: 'Website',
  },
];

export default function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Branding */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Link
              href="/"
              className="text-xl font-bold transition-colors hover:opacity-80"
              style={{ color: 'var(--color-primary)' }}
            >
              MyBlog
            </Link>
            <p className="text-sm text-muted-foreground">
              Thoughts, stories, and ideas
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground md:order-last">
            <p>© {currentYear} MyBlog. All rights reserved.</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:opacity-80"
                  style={{ color: 'var(--color-primary)' }}
                  aria-label={link.label}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
