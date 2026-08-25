import { useEffect } from "react";

import { scrapeBrand, type BrandIdentity } from "@/app/dashboard/_data/brand";
import { ScanningStep } from "@/app/dashboard/_components/flow/flow-primitives";

type BrandScanningStepProps = {
  url: string;
  onScanned: (brand: BrandIdentity) => void;
};

/** Screen 2: a purely transitional loading state while the "scrape" runs. */
export function BrandScanningStep({ url, onScanned }: BrandScanningStepProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onScanned(scrapeBrand(url));
    }, 1800);
    return () => clearTimeout(timer);
  }, [url, onScanned]);

  return <ScanningStep label="Justice is scanning…" />;
}
