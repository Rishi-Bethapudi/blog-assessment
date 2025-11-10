import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Full-Stack Blog',
  description: 'A blog platform built with Next.js, tRPC, and Drizzle.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
