import type * as React from "react";

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
      <h2 className="text-lg">{title}</h2>
      <div className="mt-6">{children}</div>
    </div>
  );
}

export function PillInput({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <Input
      className={cn("h-11 rounded-full border-2 px-4 shadow-none", className)}
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
        "w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
        tone === "solid" && "bg-muted-foreground text-background",
        tone === "muted" && "bg-muted text-foreground hover:bg-muted/70",
        tone === "outline" &&
          "border-2 border-muted-foreground/40 text-muted-foreground hover:border-muted-foreground hover:text-foreground",
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
      className="flex w-56 flex-col gap-3 rounded-lg border-2 border-transparent bg-muted p-4 text-left transition-colors hover:bg-muted/70 data-selected:border-foreground"
    >
      <span className="text-sm font-medium">{title}</span>
      {recommended && (
        <span className="text-[0.7rem] tracking-wide text-muted-foreground">
          RECOMMENDED
        </span>
      )}
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
            className="size-2 animate-bounce rounded-full bg-muted-foreground"
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
