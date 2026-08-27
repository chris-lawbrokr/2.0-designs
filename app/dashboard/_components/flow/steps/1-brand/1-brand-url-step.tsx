import { Button } from "@/components/ui/button";

import { FlowStep, PillInput } from "@/app/dashboard/_components/flow/flow-primitives";

type BrandUrlStepProps = {
  /** True once a workspace already has saved branding — changes the copy. */
  hasSavedBrand: boolean;
  url: string;
  onUrlChange: (value: string) => void;
  onSubmit: () => void;
};

/** Screen 1: collect the homepage URL to scan (or re-scan) for branding. */
export function BrandUrlStep({
  hasSavedBrand,
  url,
  onUrlChange,
  onSubmit,
}: BrandUrlStepProps) {
  return (
    <FlowStep
      title={
        hasSavedBrand
          ? "Which site should we pull branding from?"
          : "What's your law firm's URL?"
      }
    >
      <form
        className="flex flex-col items-start gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (url.trim()) onSubmit();
        }}
      >
        <PillInput
          autoFocus
          value={url}
          onChange={(event) => onUrlChange(event.target.value)}
          placeholder="www."
          aria-label="Law firm homepage URL"
          className="w-full max-w-md"
        />
        <p className="max-w-md text-xs text-muted-foreground">
          {hasSavedBrand
            ? "This replaces the branding saved for your workspace."
            : "We only scan this once — every page you create afterwards reuses the branding we find."}
        </p>
        <Button
          type="submit"
          disabled={!url.trim()}
          className="ml-auto rounded-full px-5"
        >
          Confirm
        </Button>
      </form>
    </FlowStep>
  );
}
