import type { Metadata } from 'next';
// const inter = Inter({ subsets: ['latin'] });
// import { Inter } from 'next/font/google'; // Build env can't resolve this, uncomment in your local Next.js env
import { ThemeProvider } from '../../components/theme-provider'; // Use relative path
import '../globals.css'; // Use relative path

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
      {/* <body className={inter.className}> */}
      <body className="">
        {' '}
        {/* Removed inter.className for build test */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* You would add a <PublicHeader /> component here */}
          <main>{children}</main>
          {/* You would add a <PublicFooter /> component here */}
        </ThemeProvider>
      </body>
    </html>
  );
}
