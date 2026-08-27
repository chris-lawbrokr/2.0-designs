import type { ReactNode } from "react";

import { ArrowDown, ArrowRight, ArrowUp, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { TopPagesChart } from "./analytics/top-pages-chart";
import { VisitorsTrendChart } from "./analytics/visitors-trend-chart";
import { stats, type Stat } from "../_data/analytics";

const suggestedPrompts = [
  "Why did traffic spike on Aug 25?",
  "Which page should I improve first?",
  "Where do visitors drop off?",
];

export function AnalyticsPanel() {
  return (
    <section className="flex min-w-0 flex-1 flex-col bg-background">
      <ScrollArea className="min-h-0 flex-1">
        <div className="mx-auto flex min-h-full w-full max-w-4xl flex-col justify-center gap-8 px-6 py-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-center text-2xl font-semibold tracking-tight">
              Hi Chris, how can we help?
            </h1>

            <div className="relative">
              <Sparkles
                className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-primary"
                aria-hidden
              />
              <Input
                placeholder="Is my conversion rate better this month vs. last month?"
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
              {suggestedPrompts.map((prompt) => (
                <Button
                  key={prompt}
                  variant="outline"
                  size="sm"
                  className="rounded-full font-normal text-muted-foreground"
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-3">
            <AnalyticsHighlight suggestion="Explain the spike on Aug 25">
              <VisitorsTrendChart />
            </AnalyticsHighlight>

            <AnalyticsHighlight suggestion="Why is Pricing outperforming?">
              <TopPagesChart />
            </AnalyticsHighlight>

            <AnalyticsHighlight suggestion="Help me lower my bounce rate">
              <KeyMetricsCard />
            </AnalyticsHighlight>
          </div>
        </div>
      </ScrollArea>
    </section>
  );
}

function AnalyticsHighlight({
  suggestion,
  children,
}: {
  suggestion: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="min-w-0 flex-1 *:h-full">{children}</div>
      <Button
        variant="outline"
        size="sm"
        className="justify-between rounded-full font-normal"
      >
        <span className="flex items-center gap-1.5">
          <Sparkles className="size-3.5 text-primary" aria-hidden />
          {suggestion}
        </span>
        <ArrowRight aria-hidden />
      </Button>
    </div>
  );
}

function KeyMetricsCard() {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Key metrics</CardTitle>
        <CardDescription className="text-xs">Last 30 days</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-center gap-2.5">
        {stats.map((stat, index) => (
          <div key={stat.label} className="flex flex-col gap-2.5">
            {index > 0 && <Separator />}
            <MetricRow stat={stat} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function MetricRow({ stat }: { stat: Stat }) {
  const isUp = stat.delta > 0;
  const isGood = (isUp ? "up" : "down") === stat.goodDirection;
  const DirectionIcon = isUp ? ArrowUp : ArrowDown;

  return (
    <div className="flex items-center justify-between gap-2 text-sm">
      <span className="text-muted-foreground">{stat.label}</span>
      <span className="flex items-center gap-2">
        <span className="font-medium tabular-nums">{stat.value}</span>
        <span
          data-good={isGood || undefined}
          className="flex items-center gap-0.5 text-xs font-medium text-destructive data-good:text-foreground"
        >
          <DirectionIcon className="size-3" aria-hidden />
          {Math.abs(stat.delta)}%
          <span className="sr-only">
            {isUp ? "up" : "down"}, {isGood ? "improving" : "worsening"}
          </span>
        </span>
      </span>
    </div>
  );
}
