import type { Metadata } from "next";

import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const metadata: Metadata = {
  title: "Admin · GlowCart",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-beige">
      <div className="sticky top-0 hidden h-screen w-60 shrink-0 lg:block">
        <AdminSidebar />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
