import Header from "@/components/shared/header/header";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="no-scrollbar flex w-full flex-1 flex-col overflow-auto">
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
}
