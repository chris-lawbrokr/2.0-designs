"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { ContentBlocksCanvas } from "./content-blocks-canvas";
import type { Page } from "./types";

type ContentPanelProps = {
  page: Page;
};

export function ContentPanel({ page }: ContentPanelProps) {
  const [blockCount, setBlockCount] = useState(page.content.length);
  const [resetKey, setResetKey] = useState(0);

  function discard() {
    setBlockCount(page.content.length);
    setResetKey((key) => key + 1);
  }

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-background">
      <header className="flex items-center justify-between gap-4 px-6 py-3">
        <div className="min-w-0">
          <h1 className="truncate text-sm font-medium">{page.label}</h1>
          <p className="truncate text-xs text-muted-foreground">
            {blockCount} content blocks
            {page.meta ? ` · ${page.meta}` : ""}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="ghost" onClick={discard}>
            Discard
          </Button>
          <Button>Save</Button>
        </div>
      </header>

      <Separator />

      <div className="relative min-h-0 flex-1">
        <ContentBlocksCanvas
          key={resetKey}
          pageLabel={page.label}
          initialBlocks={page.content}
          onBlocksChange={(blocks) => setBlockCount(blocks.length)}
        />
      </div>
    </section>
  );
}
