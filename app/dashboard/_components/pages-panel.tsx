"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import type { Page } from "./types";

type PagesPanelProps = {
  pages: Page[];
};

export function PagesPanel({ pages }: PagesPanelProps) {
  const activePageId = useSelectedLayoutSegment();

  return (
    <aside className="flex w-72 shrink-0 flex-col border-r">
      <div className="px-4 py-3">
        <h2 className="text-sm font-medium">Pages</h2>
        <p className="text-xs text-muted-foreground">{pages.length} pages</p>
      </div>

      <Separator />

      <ScrollArea className="min-h-0 flex-1">
        <nav className="flex flex-col gap-0.5 p-2">
          {pages.map((page) => (
            <Link
              key={page.id}
              href={`/dashboard/pages/${page.id}`}
              aria-current={page.id === activePageId ? "page" : undefined}
              className="flex w-full flex-col items-start gap-0.5 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-muted aria-[current=page]:bg-muted"
            >
              <span className="flex w-full items-center justify-between gap-2">
                <span className="truncate font-medium">{page.label}</span>
                {page.status === "draft" && (
                  <Badge variant="outline" className="shrink-0">
                    Draft
                  </Badge>
                )}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {page.content.length} blocks
                {page.meta ? ` \u00b7 ${page.meta}` : ""}
              </span>
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}
