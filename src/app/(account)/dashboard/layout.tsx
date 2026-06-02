import { SiteHeader } from "@/components/layout/site-header";
import { Footer } from "@/components/layout/footer";
import { DashboardSidebar } from "@/components/account/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8">
          <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <DashboardSidebar />
            </aside>
            <div className="min-w-0">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
