import type { BrandIdentity } from "@/app/dashboard/_data/brand";
import { EditRow } from "@/app/dashboard/_components/flow/flow-primitives";

/** Read-only presentation of the scraped/saved branding — logos, colors, fonts. */
export function BrandReview({ brand }: { brand: BrandIdentity }) {
  return (
    <div className="flex flex-col gap-7">
      <EditRow label="Logos">
        <div className="flex items-center gap-2">
          {brand.logos.map((width, i) => (
            <div
              key={i}
              className={`h-9 rounded-sm bg-muted ${width}`}
              aria-hidden
            />
          ))}
        </div>
      </EditRow>

      <EditRow label="Brand colors">
        <div className="flex items-center gap-2">
          {brand.colors.map((color) => (
            <div
              key={color}
              style={{ backgroundColor: color }}
              className="size-6 rounded-full ring-1 ring-foreground/10"
              aria-hidden
            />
          ))}
        </div>
      </EditRow>

      <EditRow label="Heading font">
        <p className="font-heading text-xl">{brand.headingFont}</p>
      </EditRow>

      <EditRow label="Paragraph font">
        <p className="font-mono text-sm">{brand.paragraphFont}</p>
      </EditRow>
    </div>
  );
}
