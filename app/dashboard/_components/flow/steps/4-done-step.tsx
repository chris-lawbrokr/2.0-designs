import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

import type { BrandIdentity } from "@/app/dashboard/_data/brand";
import type { PageSetup } from "@/app/dashboard/_components/flow/steps/3-setup-step";
import { SiteWidgetPreview } from "@/app/dashboard/_components/widget/site-widget-preview";

type DoneStepProps = {
  slug: string;
  setup: PageSetup;
  brand: BrandIdentity | null;
};

/** Frame 4 of the flow: the page is ready, previewed as the concierge widget it becomes. */
export function DoneStep({ slug, setup, brand }: DoneStepProps) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8">
      <div className="text-center">
        <h2 className="font-heading text-lg font-medium">
          Your page is ready!
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {slug || "/untitled"} was created with{" "}
          {setup === "assisted"
            ? "Conversion Intelligence"
            : "a traditional set up"}
          {brand ? `, styled from ${brand.sourceUrl}` : ""}. Here&rsquo;s how
          it greets visitors:
        </p>
      </div>

      <SiteWidgetPreview
        siteName={brand?.sourceUrl ?? "your site"}
        headline="Ask us anything,"
        accent="get answers instantly."
        description={`This concierge greets every visitor to ${
          slug || "/untitled"
        }, answers their questions, and points them toward the right next step — day or night.`}
        askPlaceholder="Ask a question about your case…"
      />

      <DialogClose render={<Button className="rounded-full px-5" />}>
        Done
      </DialogClose>
    </div>
  );
}
