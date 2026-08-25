import { ContentPanel } from "./_components/content-panel";
import { PagesPanel } from "./_components/pages-panel";
import type { Page } from "./_components/types";

const pages: Page[] = [
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
];

export default function DashboardPage() {
  const activePage = pages[0];

  return (
    <main className="flex min-h-0 flex-1 overflow-hidden m-8 rounded-lg shadow-xl">
      <PagesPanel pages={pages} activePageId={activePage.id} />
      <ContentPanel page={activePage} />
    </main>
  );
}
