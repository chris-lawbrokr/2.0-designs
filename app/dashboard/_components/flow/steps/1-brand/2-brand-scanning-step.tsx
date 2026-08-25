import { useEffect, useState } from "react";

import { scrapeBrand, type BrandIdentity } from "@/app/dashboard/_data/brand";
import { ScanningStep } from "@/app/dashboard/_components/flow/flow-primitives";

type BrandScanningStepProps = {
  url: string;
  onScanned: (brand: BrandIdentity) => void;
};

/** What the scan appears to do, in order — narrates building the overlay, not just reading colors. */
const PHASES = [
  "Reading your site…",
  "Mapping navigation & content…",
  "Assembling your concierge overlay…",
];

const PHASE_INTERVAL_MS = 700;
const TOTAL_DURATION_MS = PHASE_INTERVAL_MS * PHASES.length;

/** Screen 2: a purely transitional loading state while the "scrape" runs. */
export function BrandScanningStep({ url, onScanned }: BrandScanningStepProps) {
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    const phaseTimer = setInterval(() => {
      setPhaseIndex((i) => Math.min(i + 1, PHASES.length - 1));
    }, PHASE_INTERVAL_MS);

    const doneTimer = setTimeout(() => {
      onScanned(scrapeBrand(url));
    }, TOTAL_DURATION_MS);

    return () => {
      clearInterval(phaseTimer);
      clearTimeout(doneTimer);
    };
  }, [url, onScanned]);

  return <ScanningStep label={PHASES[phaseIndex]} />;
}
