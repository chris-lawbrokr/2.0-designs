"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import type { ContentBlock, Page } from "./types";

type ContentPanelProps = {
  page: Page;
};

export function ContentPanel({ page }: ContentPanelProps) {
  const [blocks, setBlocks] = useState<ContentBlock[]>(page.content);

  function updateBlock(id: string, value: string) {
    setBlocks((current) =>
      current.map((block) => (block.id === id ? { ...block, value } : block))
    );
  }

  return (
    <section className="flex min-w-0 flex-1 flex-col">
      <header className="flex items-center justify-between gap-4 px-6 py-3">
        <div className="min-w-0">
          <h1 className="truncate text-sm font-medium">{page.label}</h1>
          <p className="truncate text-xs text-muted-foreground">
            {page.content.length} content blocks
            {page.meta ? ` · ${page.meta}` : ""}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="ghost" onClick={() => setBlocks(page.content)}>
            Discard
          </Button>
          <Button>Save</Button>
        </div>
      </header>

      <Separator />

      <ScrollArea className="min-h-0 flex-1">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
          {blocks.map((block) => (
            <ContentBlockField
              key={block.id}
              block={block}
              onChange={(value) => updateBlock(block.id, value)}
            />
          ))}

          <Button variant="outline" className="self-start">
            Add block
          </Button>
        </div>
      </ScrollArea>
    </section>
  );
}

function ContentBlockField({
  block,
  onChange,
}: {
  block: ContentBlock;
  onChange: (value: string) => void;
}) {
  const fieldId = `block-${block.id}`;

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={fieldId} className="flex items-center gap-2">
        {block.label}
        <span className="text-xs font-normal text-muted-foreground">
          {block.type}
        </span>
      </Label>

      {block.type === "text" ? (
        <Textarea
          id={fieldId}
          rows={4}
          value={block.value}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <Input
          id={fieldId}
          value={block.value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </div>
  );
}
