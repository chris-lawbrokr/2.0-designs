import { Button } from "@/components/ui/button";

import type { BrandIdentity } from "@/app/dashboard/_data/brand";
import { FlowStep } from "@/app/dashboard/_components/flow/flow-primitives";
import { BrandReview } from "@/app/dashboard/_components/flow/steps/1-brand/brand-review";

type BrandReviewStepProps = {
  /** True when reviewing a fresh scan rather than previously saved branding. */
  isFreshScan: boolean;
  brand: BrandIdentity;
  onConfirm: () => void;
  onRescan: () => void;
};

/** Screen 3: confirm the branding before it's committed to the workspace. */
export function BrandReviewStep({
  isFreshScan,
  brand,
  onConfirm,
  onRescan,
}: BrandReviewStepProps) {
  return (
    <FlowStep
      title={
        isFreshScan
          ? "We pulled your branding! Let us know if it's correct:"
          : "Here's the branding we have on file:"
      }
    >
      <BrandReview brand={brand} />

      <div className="mt-10 flex items-center gap-3">
        <Button
          onClick={onConfirm}
          className="rounded-full bg-success px-6 text-success-foreground hover:bg-success/80"
        >
          Looks good
        </Button>
        <Button variant="ghost" onClick={onRescan}>
          Scan a different site
        </Button>
      </div>
    </FlowStep>
  );
}
