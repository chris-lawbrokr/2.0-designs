import type { BrandIdentity } from "@/app/dashboard/_data/brand";
import { BrandReviewStep } from "@/app/dashboard/_components/flow/steps/1-brand/3-brand-review-step";
import { BrandScanningStep } from "@/app/dashboard/_components/flow/steps/1-brand/2-brand-scanning-step";
import { BrandUrlStep } from "@/app/dashboard/_components/flow/steps/1-brand/1-brand-url-step";

export type BrandMode = "review" | "input" | "scanning";

type BrandStepProps = {
  mode: BrandMode;
  /** Previously saved branding, if any — null before the first scan ever runs. */
  savedBrand: BrandIdentity | null;
  /** draftBrand ?? savedBrand — whichever branding is on screen right now. */
  activeBrand: BrandIdentity | null;
  isFreshScan: boolean;
  url: string;
  onUrlChange: (value: string) => void;
  onSubmitUrl: () => void;
  onScanned: (brand: BrandIdentity) => void;
  onConfirm: () => void;
  onRescan: () => void;
};

/** Frame 1 of the flow: gathers, scans, and confirms the workspace's branding. */
export function BrandStep({
  mode,
  savedBrand,
  activeBrand,
  isFreshScan,
  url,
  onUrlChange,
  onSubmitUrl,
  onScanned,
  onConfirm,
  onRescan,
}: BrandStepProps) {
  if (mode === "scanning") {
    return <BrandScanningStep url={url} onScanned={onScanned} />;
  }

  if (mode === "review" && activeBrand) {
    return (
      <BrandReviewStep
        isFreshScan={isFreshScan}
        brand={activeBrand}
        onConfirm={onConfirm}
        onRescan={onRescan}
      />
    );
  }

  return (
    <BrandUrlStep
      hasSavedBrand={Boolean(savedBrand)}
      url={url}
      onUrlChange={onUrlChange}
      onSubmit={onSubmitUrl}
    />
  );
}
