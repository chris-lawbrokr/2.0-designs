export type BrandIdentity = {
  sourceUrl: string;
  /** Placeholder logo swatches, sized to mimic real assets. */
  logos: string[];
  colors: string[];
  headingFont: string;
  paragraphFont: string;
};

/**
 * The scrape is a one-time, workspace-level step: brand identity is pulled from
 * the firm's homepage once and then reused by every page that gets created.
 *
 * This starts empty so the first "New page" runs the scrape. Replace this with a
 * real read (server/db) and lift `onBrandChange` to a mutation when persistence
 * lands — nothing else in the flow needs to change.
 */
export const savedBrand: BrandIdentity | null = null;

/** Stand-in for the scrape itself. */
export function scrapeBrand(sourceUrl: string): BrandIdentity {
  return {
    sourceUrl,
    logos: ["w-28", "w-16", "w-32", "w-20"],
    colors: [
      "oklch(0.87 0 0)",
      "oklch(0.72 0 0)",
      "oklch(0.44 0 0)",
      "oklch(0.16 0 0)",
    ],
    headingFont: "Playfair Display",
    paragraphFont: "Helvetica Neue",
  };
}
