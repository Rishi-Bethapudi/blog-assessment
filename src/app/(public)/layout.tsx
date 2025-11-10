import { ThemeProvider } from '@/components/theme-provider';
import { TrpcProvider } from '@/lib/trpc-provider';
import { Header } from '@/components/layout/PublicNavbar';
import { Footer } from '@/components/landing/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TrpcProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Navbar />
        <main className="container mx-auto py-10">{children}</main>
        <Footer />
      </ThemeProvider>
    </TrpcProvider>
  );
}
