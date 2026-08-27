"use client";

import {
  ArrowRight,
  ArrowUpDown,
  LayoutGrid,
  List,
  ListFilter,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import type { Page } from "../_components/types";
import { getPages } from "../_data/pages";

const suggestedActions = [
  "Create a new funnel",
  "Optimize my existing funnels",
  "Add a feedback funnel",
];

export default function PagesIndexPage() {
  const pages = getPages();
  const [view, setView] = useState<"list" | "grid">("list");

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-background">
      <ScrollArea className="min-h-0 flex-1">
        <div className="mx-auto flex min-h-full w-full max-w-4xl flex-col gap-6 px-6 py-10">
          <h1 className="text-2xl font-semibold tracking-tight">Pages</h1>

          <div className="flex items-center gap-2">
            <div className="relative w-full max-w-sm">
              <Search
                className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input placeholder="Search" className="rounded-full pl-8" />
            </div>
            <div className="ml-auto flex gap-2">
              <Button variant="outline" className="rounded-full font-normal">
                <ArrowUpDown aria-hidden />
                Sort
              </Button>
              <Button variant="outline" className="rounded-full font-normal">
                <ListFilter aria-hidden />
                Filter
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label={
                  view === "list"
                    ? "Switch to grid view"
                    : "Switch to list view"
                }
                onClick={() => setView(view === "list" ? "grid" : "list")}
                className="rounded-full"
              >
                {view === "list" ? (
                  <LayoutGrid aria-hidden />
                ) : (
                  <List aria-hidden />
                )}
              </Button>
            </div>
          </div>

          {view === "list" ? (
            <div className="flex flex-col gap-3">
              {pages.map((page) => (
                <PageRow key={page.id} page={page} />
              ))}
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {pages.map((page) => (
                <PageCard key={page.id} page={page} />
              ))}
            </div>
          )}

          <div className="mt-auto flex flex-col gap-4 pt-6">
            <div className="relative">
              <Sparkles
                className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-primary"
                aria-hidden
              />
              <Input
                placeholder="What would you like to do?"
                className="h-14 rounded-xl border-primary/40 bg-primary/5 pr-14 pl-11 shadow-xs md:text-base dark:bg-primary/10"
              />
              <Button
                size="icon"
                className="absolute top-1/2 right-2.5 -translate-y-1/2"
              >
                <ArrowRight aria-hidden />
                <span className="sr-only">Ask</span>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {suggestedActions.map((action) => (
                <Button
                  key={action}
                  variant="outline"
                  size="sm"
                  className="rounded-full font-normal text-muted-foreground"
                >
                  {action}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </section>
  );
}

function PageRow({ page }: { page: Page }) {
  const isAi = page.buildType === "ai";

  return (
    <div className="relative flex items-center gap-6 rounded-xl border bg-card px-4 py-3 transition-colors hover:bg-muted/50">
      <Link
        href={`/dashboard/pages/${page.id}`}
        className="absolute inset-0 rounded-xl"
      >
        <span className="sr-only">Open {page.label}</span>
      </Link>

      <div className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate text-sm font-medium">{page.label}</span>
          {page.status === "draft" && (
            <Badge variant="outline" className="shrink-0">
              Draft
            </Badge>
          )}
        </span>
        {page.meta && (
          <span className="text-xs text-muted-foreground">{page.meta}</span>
        )}
      </div>

      <Badge variant={isAi ? "secondary" : "outline"} className="shrink-0">
        {isAi && <Sparkles aria-hidden />}
        {isAi ? "AI Optimized" : "Manual Build"}
      </Badge>

      <div className="w-16 shrink-0 text-right">
        <p className="text-sm font-medium tabular-nums">
          {page.visits.toLocaleString("en-US")}
        </p>
        <p className="text-xs text-muted-foreground">Visits</p>
      </div>

      <div className="w-20 shrink-0 text-right">
        <p className="text-sm font-medium tabular-nums">
          {page.conversionRate}%
        </p>
        <p className="text-xs text-muted-foreground">Conv. rate</p>
      </div>

      <Button
        variant="ghost"
        size="icon-sm"
        className="relative shrink-0 text-muted-foreground"
        aria-label={`Settings for ${page.label}`}
      >
        <Settings aria-hidden />
      </Button>
    </div>
  );
}

function PageCard({ page }: { page: Page }) {
  const isAi = page.buildType === "ai";

  return (
    <div className="relative flex flex-col gap-4 rounded-xl border bg-card p-4 transition-colors hover:bg-muted/50">
      <Link
        href={`/dashboard/pages/${page.id}`}
        className="absolute inset-0 rounded-xl"
      >
        <span className="sr-only">Open {page.label}</span>
      </Link>

      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <span className="flex items-center gap-2">
            <span className="truncate text-sm font-medium">{page.label}</span>
            {page.status === "draft" && (
              <Badge variant="outline" className="shrink-0">
                Draft
              </Badge>
            )}
          </span>
          {page.meta && (
            <span className="text-xs text-muted-foreground">{page.meta}</span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          className="relative -mt-1 -mr-1.5 shrink-0 text-muted-foreground"
          aria-label={`Settings for ${page.label}`}
        >
          <Settings aria-hidden />
        </Button>
      </div>

      <Badge variant={isAi ? "secondary" : "outline"} className="self-start">
        {isAi && <Sparkles aria-hidden />}
        {isAi ? "AI Optimized" : "Manual Build"}
      </Badge>

      <div className="mt-auto grid grid-cols-2 gap-2">
        <div>
          <p className="text-sm font-medium tabular-nums">
            {page.visits.toLocaleString("en-US")}
          </p>
          <p className="text-xs text-muted-foreground">Visits</p>
        </div>
        <div>
          <p className="text-sm font-medium tabular-nums">
            {page.conversionRate}%
          </p>
          <p className="text-xs text-muted-foreground">Conv. rate</p>
        </div>
      </div>
    </div>
  );
}
