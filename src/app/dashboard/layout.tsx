import { ThemeProvider } from '@/components/theme-provider';
import { TrpcProvider } from '@/lib/trpc-provider';
import Sidebar from '@/components/dashboard/SideBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TrpcProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </ThemeProvider>
    </TrpcProvider>
  );
}
