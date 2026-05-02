"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  CreditCard,
  Crown,
  Gem,
  LayoutDashboard,
  LucideIcon,
} from "lucide-react";

interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Ganhos",
    url: "/earnings",
    icon: Gem,
  },
  {
    title: "Despesas",
    url: "/expenses",
    icon: CreditCard,
  },
  {
    title: "Assinatura",
    url: "/subscriptions",
    icon: Crown,
  },
];

function buildHref(
  baseUrl: string,
  params: { month?: string | null; year?: string | null },
): string {
  const searchParams = new URLSearchParams();

  if (params.month) searchParams.set("month", params.month);
  if (params.year) searchParams.set("year", params.year);

  const query = searchParams.toString();

  return query ? `${baseUrl}?${query}` : baseUrl;
}

export function AppSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const month = searchParams.get("month");
  const year = searchParams.get("year");

  return (
    <Sidebar>
      <SidebarHeader>
        <Image
          src="/logo.svg"
          width={280}
          height={60}
          alt="Ganhei LC"
          className="-ml-2.5"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.url;
              const href = buildHref(item.url, { month, year });

              return (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link href={href}>
                      {" "}
                      {/* 👈 href em vez de item.url */}
                      <Icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
