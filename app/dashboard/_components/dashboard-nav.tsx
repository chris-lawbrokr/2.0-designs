"use client";

import { House, FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/dashboard", label: "Home", icon: House, exact: true },
  { href: "/dashboard/pages", label: "Pages", icon: FileText, exact: false },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex w-56 shrink-0 flex-col gap-1 border-r bg-sidebar p-3 text-sidebar-foreground">
      <div className="px-2 py-1.5">
        <span className="text-sm font-medium">Dashboard</span>
      </div>

      {tabs.map((tab) => {
        const isActive = tab.exact
          ? pathname === tab.href
          : pathname.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground aria-[current=page]:bg-sidebar-accent aria-[current=page]:font-medium aria-[current=page]:text-sidebar-accent-foreground"
          >
            <tab.icon className="size-4" />
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
