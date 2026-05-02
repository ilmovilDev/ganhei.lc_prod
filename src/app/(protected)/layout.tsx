import Header from "@/components/shared/header/header";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Suspense } from "react";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Suspense fallback={null}>
        <AppSidebar />
      </Suspense>
      <main className="no-scrollbar flex w-full flex-1 flex-col overflow-auto p-4">
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
}
