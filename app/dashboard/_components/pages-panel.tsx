import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import type { Page } from "./types";

type PagesPanelProps = {
  pages: Page[];
  activePageId?: string;
};

export function PagesPanel({ pages, activePageId }: PagesPanelProps) {
  return (
    <aside className="flex w-72 shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="px-4 py-3">
        <h2 className="text-sm font-medium">Pages</h2>
        <p className="text-xs text-muted-foreground">{pages.length} pages</p>
      </div>

      <Separator />

      <ScrollArea className="min-h-0 flex-1">
        <nav className="flex flex-col gap-0.5 p-2">
          {pages.map((page) => (
            <button
              key={page.id}
              type="button"
              data-active={page.id === activePageId || undefined}
              className="flex w-full flex-col items-start gap-0.5 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground"
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
                {page.meta ? ` · ${page.meta}` : ""}
              </span>
            </button>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}
