import {
  ArrowRight,
  ExternalLink,
  Phone,
  Sparkles,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const STATS = [
  { value: "12", label: "YEARS" },
  { value: "180+", label: "5-STAR REVIEWS" },
  { value: "2,400+", label: "CLIENTS" },
  { value: "8", label: "ATTORNEYS" },
];

const QUICK_ACTIONS = [
  { label: "Call", icon: Phone },
  { label: "Attorneys", icon: Users },
  { label: "Main site", icon: ExternalLink },
];

type SiteWidgetPreviewProps = {
  /** Shown top-left, standing in for the firm's own site chrome. */
  siteName: string;
  /** Plain first line of the hero — reflects whatever's being edited. */
  headline: string;
  /** Purple-accented second line of the hero. */
  accent: string;
  description: string;
  askPlaceholder: string;
};

/**
 * A preview of the AI concierge widget a page becomes once published — it
 * loads on top of the firm's site to handle navigation, engagement, and
 * visitor questions. Purple is a placeholder accent, not the firm's brand.
 */
export function SiteWidgetPreview({
  siteName,
  headline,
  accent,
  description,
  askPlaceholder,
}: SiteWidgetPreviewProps) {
  return (
    <div className="relative isolate w-full overflow-hidden rounded-3xl bg-neutral-950 text-white ring-1 ring-white/10">
      <div
        aria-hidden
        className="absolute -top-24 -right-24 size-72 rounded-full bg-brand/30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-16 size-72 rounded-full bg-brand/20 blur-3xl"
      />

      <div className="relative flex flex-col gap-10 p-8 sm:p-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="truncate text-sm font-medium tracking-wide text-white/70">
            {siteName}
          </span>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 sm:flex">
              <Phone className="size-4" />
              (312) 555-0134
            </span>
            <Button className="rounded-full bg-brand px-5 text-brand-foreground hover:bg-brand/90">
              Schedule a consultation
            </Button>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-[1.3fr_1fr] sm:items-center">
          <div className="flex flex-col gap-5">
            <h2 className="font-heading text-4xl leading-tight break-words sm:text-5xl">
              {headline}
              <br />
              <span className="text-brand">{accent}</span>
            </h2>
            <p className="max-w-md text-sm text-white/70">{description}</p>

            <form
              className="flex w-full max-w-md items-center gap-2 rounded-full border-2 border-white/15 bg-white/5 py-1.5 pr-1.5 pl-4"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                placeholder={askPlaceholder}
                aria-label="Ask a question"
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
              />
              <Button
                type="submit"
                size="icon-sm"
                aria-label="Ask"
                className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90"
              >
                <ArrowRight />
              </Button>
            </form>
          </div>

          <div className="relative hidden aspect-square items-center justify-center sm:flex">
            <div className="absolute inset-4 rounded-[2rem] bg-gradient-to-br from-brand/40 via-brand/10 to-transparent" />
            <div className="relative flex size-28 items-center justify-center rounded-3xl bg-brand/20 ring-1 ring-brand/40">
              <Sparkles className="size-10 text-brand" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-stretch gap-3">
          <div className="flex min-w-52 flex-1 flex-col gap-1 rounded-2xl bg-neutral-900 p-4">
            <span className="text-[0.65rem] font-medium tracking-wide text-white/40">
              FROM THE BLOG
            </span>
            <p className="text-sm font-medium">
              How to prepare for your first consultation
            </p>
            <span className="text-xs text-brand">Read the blog &rarr;</span>
          </div>

          <div className="flex flex-1 items-center justify-around gap-4 rounded-2xl bg-neutral-900 p-4 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-lg font-semibold text-brand">
                  {stat.value}
                </p>
                <p className="text-[0.65rem] text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.label}
                type="button"
                className="flex flex-col items-center gap-1.5 rounded-2xl bg-neutral-900 px-4 py-3 text-xs text-white/80 transition-colors hover:bg-neutral-800"
              >
                <action.icon className="size-4" />
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
