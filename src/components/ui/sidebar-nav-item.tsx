"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarNavItemProps {
  title: string;
  url: string;
  icon: LucideIcon;
}

export function SidebarNavItem({
  title,
  url,
  icon: Icon,
}: SidebarNavItemProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // preserva o ?month= atual ao navegar entre rotas
  const month = searchParams.get("month");
  const href = month ? `${url}?month=${month}` : url;

  const isActive = pathname.startsWith(url);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-accent text-accent-foreground font-medium"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      )}
    >
      <Icon className="h-4 w-4" />
      {title}
    </Link>
  );
}
