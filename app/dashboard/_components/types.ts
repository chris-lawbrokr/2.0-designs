export type ContentBlock = {
  id: string;
  label: string;
  type: "heading" | "text" | "image" | "embed";
  value: string;
};

export type Page = {
  id: string;
  label: string;
  meta?: string;
  status?: "draft" | "live";
  buildType: "manual" | "ai";
  visits: number;
  /** Share of visits that convert, as a percentage. */
  conversionRate: number;
  content: ContentBlock[];
};
