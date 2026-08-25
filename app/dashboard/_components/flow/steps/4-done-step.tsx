import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

import type { BrandIdentity } from "@/app/dashboard/_data/brand";
import { FlowStep } from "@/app/dashboard/_components/flow/flow-primitives";
import type { PageSetup } from "@/app/dashboard/_components/flow/steps/3-setup-step";

type DoneStepProps = {
  slug: string;
  setup: PageSetup;
  brand: BrandIdentity | null;
};

/** Frame 4 of the flow: confirmation that the page was created. */
export function DoneStep({ slug, setup, brand }: DoneStepProps) {
  return (
    <FlowStep title="Your page is ready!">
      <p className="text-sm text-muted-foreground">
        {slug || "/untitled"} was created with{" "}
        {setup === "assisted"
          ? "Conversion Intelligence"
          : "a traditional set up"}
        {brand ? `, styled from ${brand.sourceUrl}` : ""}.
      </p>
      <DialogClose
        render={
          <Button className="mt-8 rounded-full bg-success px-6 text-success-foreground hover:bg-success/80" />
        }
      >
        Open page
      </DialogClose>
    </FlowStep>
  );
}
