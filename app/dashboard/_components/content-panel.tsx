"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { ContentBlocksCanvas } from "./content-blocks-canvas";
import type { Page } from "./types";

type ContentPanelProps = {
  page: Page;
};

export function ContentPanel({ page }: ContentPanelProps) {
  const [blockCount, setBlockCount] = useState(page.content.length);

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-background">
      <header className="flex items-center gap-3 px-6 py-3">
        <Link
          href="/dashboard/pages"
          aria-label="Back to pages"
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "shrink-0 rounded-full"
          )}
        >
          <ArrowLeft aria-hidden />
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-sm font-medium">{page.label}</h1>
          <p className="truncate text-xs text-muted-foreground">
            {blockCount} content blocks
            {page.meta ? ` · ${page.meta}` : ""}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button>Save</Button>
        </div>
      </header>

      <Separator />

      <div className="relative min-h-0 flex-1">
        <ContentBlocksCanvas
          pageLabel={page.label}
          initialBlocks={page.content}
          onBlocksChange={(blocks) => setBlockCount(blocks.length)}
        />
      </div>
    </section>
  );
}
