import type { Metadata } from "next";
import AdminNav from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin" },
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      <body className="bg-slate-100 min-h-screen">
        <div className="flex min-h-screen">
          <AdminNav />
          <main className="flex-1 overflow-auto pt-12 pb-20 px-4 md:pt-0 md:pb-0 md:p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
