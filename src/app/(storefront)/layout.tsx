import { SiteHeader } from "@/components/layout/site-header";
import { Footer } from "@/components/layout/footer";
import { QuickViewModal } from "@/components/product/quick-view-modal";
import { CompareBar } from "@/components/product/compare-bar";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <Footer />
      <QuickViewModal />
      <CompareBar />
    </div>
  );
}
