import type { Page } from "../_components/types";

export const pages: Page[] = [
  {
    id: "home",
    label: "Home",
    meta: "Edited 2h ago",
    status: "live",
    buildType: "manual",
    visits: 24980,
    conversionRate: 3.2,
    content: [
      { id: "h1", label: "Headline", type: "heading", value: "Design faster" },
      {
        id: "sub",
        label: "Subhead",
        type: "text",
        value: "Ship polished pages without fighting your layout.",
      },
      { id: "hero", label: "Hero image", type: "image", value: "/hero.png" },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    meta: "Edited yesterday",
    status: "live",
    buildType: "ai",
    visits: 16420,
    conversionRate: 5.6,
    content: [
      { id: "title", label: "Title", type: "heading", value: "Plans" },
      {
        id: "note",
        label: "Billing note",
        type: "text",
        value: "Billed annually. Cancel anytime.",
      },
      {
        id: "hero",
        label: "Hero image",
        type: "image",
        value: "/pricing-hero.png",
      },
    ],
  },
  {
    id: "about",
    label: "About",
    meta: "Edited 3d ago",
    status: "draft",
    buildType: "manual",
    visits: 9130,
    conversionRate: 2.1,
    content: [
      { id: "title", label: "Headline", type: "heading", value: "About us" },
      {
        id: "story",
        label: "Story",
        type: "text",
        value: "We started in 2024.",
      },
      {
        id: "hero",
        label: "Hero image",
        type: "image",
        value: "/about-hero.png",
      },
    ],
  },
  {
    id: "changelog",
    label: "Changelog",
    meta: "Edited last week",
    status: "draft",
    buildType: "ai",
    visits: 7860,
    conversionRate: 1.4,
    content: [
      { id: "title", label: "Title", type: "heading", value: "What's new" },
      {
        id: "summary",
        label: "Summary",
        type: "text",
        value: "Weekly notes on what shipped and what's next.",
      },
      {
        id: "hero",
        label: "Hero image",
        type: "image",
        value: "/changelog-hero.png",
      },
    ],
  },
];

export function getPages() {
  return pages;
}

export function getPage(pageId: string) {
  return pages.find((page) => page.id === pageId);
}
