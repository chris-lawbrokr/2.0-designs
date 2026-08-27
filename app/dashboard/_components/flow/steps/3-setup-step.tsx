import { Button } from "@/components/ui/button";

import { FlowStep, OptionCard } from "@/app/dashboard/_components/flow/flow-primitives";

export type PageSetup = "assisted" | "blank";

type SetupStepProps = {
  setup: PageSetup;
  onSetupChange: (setup: PageSetup) => void;
  onNext: () => void;
};

/** Frame 3 of the flow: choose how the new page should be set up. */
export function SetupStep({ setup, onSetupChange, onNext }: SetupStepProps) {
  return (
    <FlowStep title="How should we set up this page?">
      <div className="flex flex-wrap gap-3">
        <OptionCard
          title="Conversion Intelligence"
          recommended
          bullets={[
            "Full AI optimization",
            "Chat-like experience for clients",
          ]}
          selected={setup === "assisted"}
          onSelect={() => onSetupChange("assisted")}
        />
        <OptionCard
          title="Traditional Set Up"
          bullets={[
            "AI assisted set up",
            "Optimized library of workflows",
            "You control all messaging",
          ]}
          selected={setup === "blank"}
          onSelect={() => onSetupChange("blank")}
        />
      </div>

      <Button onClick={onNext} className="mt-10 rounded-full px-5">
        Create page
      </Button>
    </FlowStep>
  );
}
