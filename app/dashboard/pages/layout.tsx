import { PagesPanel } from "../_components/pages-panel";
import { getPages } from "../_data/pages";

export default function PagesLayout({ children }: LayoutProps<"/dashboard/pages">) {
  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <PagesPanel pages={getPages()} />
      {children}
    </div>
  );
}
