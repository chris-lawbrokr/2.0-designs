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
