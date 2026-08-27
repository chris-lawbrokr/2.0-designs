export type AnswerOption = {
  id: string;
  label: string;
  /** Question this answer routes to — null sends the visitor to the end of the flow. */
  nextId: string | null;
};

export type Question = {
  id: string;
  prompt: string;
  answers: AnswerOption[];
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
  questions: Question[];
};
