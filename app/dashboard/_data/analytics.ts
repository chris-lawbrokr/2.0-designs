export type Stat = {
  label: string;
  value: string;
  delta: number;
  /** Which direction counts as an improvement for this metric. */
  goodDirection: "up" | "down";
  hint: string;
};

export type PageViews = {
  pageId: string;
  label: string;
  views: number;
};

export const stats: Stat[] = [
  {
    label: "Visitors",
    value: "18,204",
    delta: 12.4,
    goodDirection: "up",
    hint: "vs. last 30 days",
  },
  {
    label: "Page views",
    value: "63,918",
    delta: 8.1,
    goodDirection: "up",
    hint: "vs. last 30 days",
  },
  {
    label: "Avg. time",
    value: "2m 14s",
    delta: -3.2,
    goodDirection: "up",
    hint: "vs. last 30 days",
  },
  {
    label: "Bounce rate",
    value: "41.6%",
    delta: -1.8,
    goodDirection: "down",
    hint: "vs. last 30 days",
  },
];

export const pageViews: PageViews[] = [
  { pageId: "home", label: "Home", views: 24980 },
  { pageId: "pricing", label: "Pricing", views: 16420 },
  { pageId: "about", label: "About", views: 9130 },
  { pageId: "changelog", label: "Changelog", views: 7860 },
  { pageId: "docs", label: "Docs", views: 5528 },
];
