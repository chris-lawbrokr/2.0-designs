import type * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * Shared visual language for the onboarding-style flow screens:
 * pill inputs, pill chips, "Edit" rows and option cards.
 */

export function FlowStep({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-2xl", className)}>
      <h2 className="font-heading text-lg font-medium">{title}</h2>
      <div className="mt-6">{children}</div>
    </div>
  );
}

export function PillInput({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <Input
      className={cn("h-10 rounded-full px-4", className)}
      {...props}
    />
  );
}

type ChipProps = React.ComponentProps<"button"> & {
  tone?: "solid" | "muted" | "outline";
};

export function Chip({ tone = "muted", className, ...props }: ChipProps) {
  return (
    <button
      type="button"
      className={cn(
        "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
        tone === "solid" &&
          "bg-secondary font-medium text-secondary-foreground",
        tone === "muted" && "border bg-card hover:bg-muted/50",
        tone === "outline" &&
          "border border-dashed text-muted-foreground hover:border-muted-foreground/60 hover:text-foreground",
        className
      )}
      {...props}
    />
  );
}

export function EditRow({
  label,
  onEdit,
  children,
}: {
  label: string;
  onEdit?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-between gap-4">
        <span className="text-xs font-medium">{label}</span>
        <button
          type="button"
          onClick={onEdit}
          className="text-[0.7rem] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Edit
        </button>
      </div>
      {children}
    </div>
  );
}

export function OptionCard({
  title,
  recommended,
  bullets,
  selected,
  onSelect,
}: {
  title: string;
  recommended?: boolean;
  bullets: string[];
  selected?: boolean;
  onSelect?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      data-selected={selected || undefined}
      className="flex w-56 flex-col gap-3 rounded-xl border bg-card p-4 text-left transition-all hover:bg-muted/50 data-selected:border-primary data-selected:ring-3 data-selected:ring-primary/20"
    >
      <span className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-medium">{title}</span>
        {recommended && (
          <Badge variant="secondary" className="shrink-0">
            Recommended
          </Badge>
        )}
      </span>
      <ul className="flex list-disc flex-col gap-1 pl-4 text-xs text-muted-foreground">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </button>
  );
}

export function ScanningStep({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex gap-1.5" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-2 animate-bounce rounded-full bg-primary"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <p className="text-sm text-muted-foreground" role="status">
        {label}
      </p>
    </div>
  );
}
