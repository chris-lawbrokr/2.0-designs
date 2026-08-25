import { ArrowDown, ArrowUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { TopPagesChart } from "./analytics/top-pages-chart";
import { VisitorsTrendChart } from "./analytics/visitors-trend-chart";
import { stats, type Stat } from "../_data/analytics";

export function AnalyticsPanel() {
  return (
    <section className="flex min-w-0 flex-1 flex-col bg-background">
      <header className="px-6 py-3">
        <h1 className="text-sm font-medium">Home</h1>
        <p className="text-xs text-muted-foreground">Last 30 days</p>
      </header>

      <Separator />

      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-6 p-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatTile key={stat.label} stat={stat} />
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <VisitorsTrendChart />
            <TopPagesChart />
          </div>
        </div>
      </ScrollArea>
    </section>
  );
}

function StatTile({ stat }: { stat: Stat }) {
  const isUp = stat.delta > 0;
  const isGood = (isUp ? "up" : "down") === stat.goodDirection;
  const DirectionIcon = isUp ? ArrowUp : ArrowDown;

  return (
    <Card>
      <CardHeader>
        <CardDescription>{stat.label}</CardDescription>
        <CardTitle className="text-2xl tabular-nums">{stat.value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="flex items-center gap-1.5 text-xs">
          <span
            data-good={isGood || undefined}
            className="flex items-center gap-0.5 font-medium text-destructive data-good:text-foreground"
          >
            <DirectionIcon className="size-3" aria-hidden />
            {Math.abs(stat.delta)}%
            <span className="sr-only">
              {isUp ? "up" : "down"}, {isGood ? "improving" : "worsening"}
            </span>
          </span>
          <span className="text-muted-foreground">{stat.hint}</span>
        </p>
      </CardContent>
    </Card>
  );
}
