"use client";

import { ArrowLeft, X } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import { type BrandIdentity } from "@/app/dashboard/_data/brand";
import { BrandStep, type BrandMode } from "@/app/dashboard/_components/flow/steps/1-brand/brand-step";
import { SectionsStep } from "@/app/dashboard/_components/flow/steps/2-sections-step";
import { SetupStep, type PageSetup } from "@/app/dashboard/_components/flow/steps/3-setup-step";
import { DoneStep } from "@/app/dashboard/_components/flow/steps/4-done-step";

/** Constant for every run, so committing the brand can never re-index the flow. */
const STEPS = ["brand", "sections", "setup", "done"] as const;

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
  const [setup, setSetup] = useState<PageSetup>("assisted");
  const [isScanning, setIsScanning] = useState(false);
  /** Set only when the user explicitly asks to scan a different site. */
  const [forceInput, setForceInput] = useState(false);

  const step = STEPS[stepIndex];
  const activeBrand = draftBrand ?? brand;

  // Screen 1 shows the saved branding when we have it, the URL field otherwise —
  // and re-scanning is always one click away from the review.
  const brandMode: BrandMode = isScanning
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

  const handleScanned = useCallback((scanned: BrandIdentity) => {
    setDraftBrand(scanned);
    setIsScanning(false);
    setForceInput(false);
  }, []);

  function handleConfirmBrand() {
    if (draftBrand) onBrandChange(draftBrand);
    next();
  }

  function handleRescan() {
    setUrl("");
    setDraftBrand(null);
    setForceInput(true);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="fixed inset-4 top-4 left-4 flex h-auto w-auto max-w-none translate-x-0 translate-y-0 flex-col gap-0 p-0 sm:max-w-none"
      >
        <DialogTitle className="sr-only">Create a new page</DialogTitle>

        <header className="flex shrink-0 items-center justify-between gap-4 border-b px-4 py-3">
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
                className="h-1 w-8 rounded-full bg-muted data-current:bg-primary"
              />
            ))}
          </div>

          <DialogClose
            render={<Button variant="ghost" size="icon-sm" aria-label="Close" />}
          >
            <X />
          </DialogClose>
        </header>

        <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto px-8 py-10">
          {step === "brand" && (
            <BrandStep
              mode={brandMode}
              savedBrand={brand}
              activeBrand={activeBrand}
              isFreshScan={Boolean(draftBrand)}
              url={url}
              onUrlChange={setUrl}
              onSubmitUrl={() => setIsScanning(true)}
              onScanned={handleScanned}
              onConfirm={handleConfirmBrand}
              onRescan={handleRescan}
            />
          )}

          {step === "sections" && (
            <SectionsStep slug={slug} onSlugChange={setSlug} onNext={next} />
          )}

          {step === "setup" && (
            <SetupStep setup={setup} onSetupChange={setSetup} onNext={next} />
          )}

          {step === "done" && (
            <DoneStep slug={slug} setup={setup} brand={activeBrand} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
