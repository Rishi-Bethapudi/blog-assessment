import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../components/theme-provider'; // Relative path
import { TrpcProvider } from '../lib/trpc-provider'; // Relative path
import './globals.css'; // Relative path

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Full-Stack Blog',
  description: 'A blog platform built with Next.js, tRPC, and Drizzle.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <TrpcProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* You can add a <Header /> component here later */}
            <main>{children}</main>
            {/* You can add a <Footer /> component here later */}
          </ThemeProvider>
        </TrpcProvider>
      </body>
    </html>
  );
}
