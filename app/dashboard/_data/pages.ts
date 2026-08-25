import type { Page } from "../_components/types";

export const pages: Page[] = [
  {
    id: "home",
    label: "Home",
    meta: "Edited 2h ago",
    status: "live",
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
    content: [
      { id: "title", label: "Title", type: "heading", value: "Plans" },
      {
        id: "note",
        label: "Billing note",
        type: "text",
        value: "Billed annually. Cancel anytime.",
      },
    ],
  },
  {
    id: "about",
    label: "About",
    meta: "Edited 3d ago",
    status: "draft",
    content: [
      {
        id: "story",
        label: "Story",
        type: "text",
        value: "We started in 2024.",
      },
    ],
  },
  {
    id: "changelog",
    label: "Changelog",
    meta: "Edited last week",
    status: "draft",
    content: [
      { id: "title", label: "Title", type: "heading", value: "What's new" },
    ],
  },
];

export function getPages() {
  return pages;
}

export function getPage(pageId: string) {
  return pages.find((page) => page.id === pageId);
}
