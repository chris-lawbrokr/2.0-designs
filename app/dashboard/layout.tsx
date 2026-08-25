import { DashboardNav } from "./_components/dashboard-nav";

export default function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  return (
    <div className="flex min-h-0 flex-1 overflow-hidden m-8 shadow-xl rounded-xl bg-background">
      <DashboardNav />
      {children}
    </div>
  );
}
