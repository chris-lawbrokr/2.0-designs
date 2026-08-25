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

export type VisitorsTrendPoint = {
  date: string;
  visitors: number;
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

export const visitorsTrend: VisitorsTrendPoint[] = [
  { date: "Aug 1", visitors: 520 },
  { date: "Aug 2", visitors: 540 },
  { date: "Aug 3", visitors: 610 },
  { date: "Aug 4", visitors: 590 },
  { date: "Aug 5", visitors: 480 },
  { date: "Aug 6", visitors: 430 },
  { date: "Aug 7", visitors: 460 },
  { date: "Aug 8", visitors: 560 },
  { date: "Aug 9", visitors: 600 },
  { date: "Aug 10", visitors: 650 },
  { date: "Aug 11", visitors: 640 },
  { date: "Aug 12", visitors: 520 },
  { date: "Aug 13", visitors: 470 },
  { date: "Aug 14", visitors: 500 },
  { date: "Aug 15", visitors: 610 },
  { date: "Aug 16", visitors: 660 },
  { date: "Aug 17", visitors: 690 },
  { date: "Aug 18", visitors: 705 },
  { date: "Aug 19", visitors: 560 },
  { date: "Aug 20", visitors: 510 },
  { date: "Aug 21", visitors: 540 },
  { date: "Aug 22", visitors: 650 },
  { date: "Aug 23", visitors: 700 },
  { date: "Aug 24", visitors: 740 },
  { date: "Aug 25", visitors: 760 },
  { date: "Aug 26", visitors: 610 },
  { date: "Aug 27", visitors: 560 },
  { date: "Aug 28", visitors: 600 },
  { date: "Aug 29", visitors: 680 },
  { date: "Aug 30", visitors: 720 },
];
