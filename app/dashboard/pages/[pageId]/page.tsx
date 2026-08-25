import { notFound } from "next/navigation";

import { ContentPanel } from "../../_components/content-panel";
import { getPage, getPages } from "../../_data/pages";

export function generateStaticParams() {
  return getPages().map((page) => ({ pageId: page.id }));
}

export default async function EditPagePage({
  params,
}: PageProps<"/dashboard/pages/[pageId]">) {
  const { pageId } = await params;
  const page = getPage(pageId);

  if (!page) notFound();

  return <ContentPanel page={page} />;
}
