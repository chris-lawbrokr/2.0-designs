import { Button } from "@/components/ui/button";

import { Chip, FlowStep, PillInput } from "@/app/dashboard/_components/flow/flow-primitives";

const SUGGESTED_SECTIONS = [
  { area: "Hero", blocks: ["Headline", "Subhead", "Call to action"] },
  { area: "Services", blocks: ["Intro", "Service list"] },
  { area: "Contact", blocks: ["Form"] },
];

type SectionsStepProps = {
  slug: string;
  onSlugChange: (value: string) => void;
  onNext: () => void;
};

/** Frame 2 of the flow: confirm the page's URL and its suggested sections. */
export function SectionsStep({ slug, onSlugChange, onNext }: SectionsStepProps) {
  return (
    <FlowStep title="Confirm the sections on this page:">
      <div className="flex flex-col gap-2">
        <label htmlFor="page-slug" className="text-xs font-medium">
          Page URL
        </label>
        <PillInput
          id="page-slug"
          value={slug}
          onChange={(event) => onSlugChange(event.target.value)}
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
        onClick={onNext}
        className="mt-10 rounded-full bg-success px-6 text-success-foreground hover:bg-success/80"
      >
        Looks good
      </Button>
    </FlowStep>
  );
}
