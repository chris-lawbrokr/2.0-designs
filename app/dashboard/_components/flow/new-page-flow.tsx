"use client";

import { ArrowLeft, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import { scrapeBrand, type BrandIdentity } from "../../_data/brand";
import { BrandReview } from "./brand-review";
import {
  Chip,
  FlowStep,
  OptionCard,
  PillInput,
  ScanningStep,
} from "./flow-primitives";

/** Constant for every run, so committing the brand can never re-index the flow. */
const STEPS = ["brand", "sections", "setup", "done"] as const;

const SUGGESTED_SECTIONS = [
  { area: "Hero", blocks: ["Headline", "Subhead", "Call to action"] },
  { area: "Services", blocks: ["Intro", "Service list"] },
  { area: "Contact", blocks: ["Form"] },
];

type NewPageFlowProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Null until the homepage has been scraped once for this workspace. */
  brand: BrandIdentity | null;
  onBrandChange: (brand: BrandIdentity) => void;
};

export function NewPageFlow({
  open,
  onOpenChange,
  brand,
  onBrandChange,
}: NewPageFlowProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [draftBrand, setDraftBrand] = useState<BrandIdentity | null>(null);
  const [setup, setSetup] = useState<"assisted" | "blank">("assisted");
  const [isScanning, setIsScanning] = useState(false);
  /** Set only when the user explicitly asks to scan a different site. */
  const [forceInput, setForceInput] = useState(false);

  const step = STEPS[stepIndex];
  const activeBrand = draftBrand ?? brand;

  // Screen 1 shows the saved branding when we have it, the URL field otherwise —
  // and re-scanning is always one click away from the review.
  const brandMode: "review" | "input" | "scanning" = isScanning
    ? "scanning"
    : forceInput || !activeBrand
      ? "input"
      : "review";

  function reset() {
    setStepIndex(0);
    setUrl("");
    setSlug("");
    setDraftBrand(null);
    setSetup("assisted");
    setIsScanning(false);
    setForceInput(false);
  }

  function handleOpenChange(next: boolean) {
    if (!next) reset();
    onOpenChange(next);
  }

  const next = () => setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));

  function back() {
    // Backing out of a re-scan returns to the saved branding.
    if (stepIndex === 0 && forceInput && brand) {
      setForceInput(false);
      return;
    }
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  // The scanning screen is purely a transition.
  useEffect(() => {
    if (!isScanning) return;
    const timer = setTimeout(() => {
      setDraftBrand(scrapeBrand(url));
      setIsScanning(false);
      setForceInput(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, [isScanning, url]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="fixed inset-0 top-0 left-0 flex h-dvh w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none p-0 ring-0 sm:max-w-none"
      >
        <DialogTitle className="sr-only">Create a new page</DialogTitle>

        <header className="flex items-center justify-between gap-4 px-6 py-4">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={back}
            disabled={(stepIndex === 0 && !forceInput) || isScanning}
            aria-label="Back"
          >
            <ArrowLeft />
          </Button>

          <div className="flex items-center gap-1.5" aria-hidden>
            {STEPS.map((name, i) => (
              <span
                key={name}
                data-current={i <= stepIndex || undefined}
                className="h-1 w-8 rounded-full bg-muted data-current:bg-foreground"
              />
            ))}
          </div>

          <DialogClose
            render={<Button variant="ghost" size="icon-sm" aria-label="Close" />}
          >
            <X />
          </DialogClose>
        </header>

        <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto px-6 py-10">
          {step === "brand" && brandMode === "input" && (
            <FlowStep
              title={
                brand
                  ? "Which site should we pull branding from?"
                  : "What's your law firm's URL?"
              }
            >
              <form
                className="flex flex-col items-start gap-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (url.trim()) setIsScanning(true);
                }}
              >
                <PillInput
                  autoFocus
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="www."
                  aria-label="Law firm homepage URL"
                  className="w-full max-w-md"
                />
                <p className="max-w-md text-xs text-muted-foreground">
                  {brand
                    ? "This replaces the branding saved for your workspace."
                    : "We only scan this once — every page you create afterwards reuses the branding we find."}
                </p>
                <Button
                  type="submit"
                  disabled={!url.trim()}
                  className="ml-auto rounded-full border-2 bg-background px-5 text-foreground hover:bg-muted"
                >
                  Confirm
                </Button>
              </form>
            </FlowStep>
          )}

          {step === "brand" && brandMode === "scanning" && (
            <ScanningStep label="Justice is scanning…" />
          )}

          {step === "brand" && brandMode === "review" && activeBrand && (
            <FlowStep
              title={
                draftBrand
                  ? "We pulled your branding! Let us know if it's correct:"
                  : "Here's the branding we have on file:"
              }
            >
              <BrandReview brand={activeBrand} />

              <div className="mt-10 flex items-center gap-3">
                <Button
                  onClick={() => {
                    if (draftBrand) onBrandChange(draftBrand);
                    next();
                  }}
                  className="rounded-full bg-success px-6 text-success-foreground hover:bg-success/80"
                >
                  Looks good
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setUrl("");
                    setDraftBrand(null);
                    setForceInput(true);
                  }}
                >
                  Scan a different site
                </Button>
              </div>
            </FlowStep>
          )}

          {step === "sections" && (
            <FlowStep title="Confirm the sections on this page:">
              <div className="flex flex-col gap-2">
                <label htmlFor="page-slug" className="text-xs font-medium">
                  Page URL
                </label>
                <PillInput
                  id="page-slug"
                  value={slug}
                  onChange={(event) => setSlug(event.target.value)}
                  placeholder="/pricing"
                  className="max-w-xs"
                />
              </div>

              <div className="mt-8 flex flex-wrap items-start gap-3">
                {SUGGESTED_SECTIONS.map((section) => (
                  <div key={section.area} className="flex w-44 flex-col gap-2">
                    <Chip tone="solid">{section.area}</Chip>
                    {section.blocks.map((block) => (
                      <Chip key={block}>{block}</Chip>
                    ))}
                    <Chip tone="outline">Add block&hellip;</Chip>
                  </div>
                ))}
                <div className="flex w-44 flex-col gap-2">
                  <Chip tone="outline">Add section&hellip;</Chip>
                </div>
              </div>

              <Button
                onClick={next}
                className="mt-10 rounded-full bg-success px-6 text-success-foreground hover:bg-success/80"
              >
                Looks good
              </Button>
            </FlowStep>
          )}

          {step === "setup" && (
            <FlowStep title="How should we set up this page?">
              <div className="flex flex-wrap gap-3">
                <OptionCard
                  title="Conversion Intelligence"
                  recommended
                  bullets={[
                    "Full AI optimization",
                    "Chat-like experience for clients",
                  ]}
                  selected={setup === "assisted"}
                  onSelect={() => setSetup("assisted")}
                />
                <OptionCard
                  title="Traditional Set Up"
                  bullets={[
                    "AI assisted set up",
                    "Optimized library of workflows",
                    "You control all messaging",
                  ]}
                  selected={setup === "blank"}
                  onSelect={() => setSetup("blank")}
                />
              </div>

              <Button
                onClick={next}
                className="mt-10 rounded-full bg-success px-6 text-success-foreground hover:bg-success/80"
              >
                Create page
              </Button>
            </FlowStep>
          )}

          {step === "done" && (
            <FlowStep title="Your page is ready!">
              <p className="text-sm text-muted-foreground">
                {slug || "/untitled"} was created with{" "}
                {setup === "assisted"
                  ? "Conversion Intelligence"
                  : "a traditional set up"}
                {activeBrand ? `, styled from ${activeBrand.sourceUrl}` : ""}.
              </p>
              <DialogClose
                render={
                  <Button className="mt-8 rounded-full bg-success px-6 text-success-foreground hover:bg-success/80" />
                }
              >
                Open page
              </DialogClose>
            </FlowStep>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
