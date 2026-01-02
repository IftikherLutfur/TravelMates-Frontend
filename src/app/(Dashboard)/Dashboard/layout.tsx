import Sidebar from "@/components/AdminDashBoard/Sidebar";
import { Footer } from "@/components/shared/Footer";
import { ReactNode } from "react";

export default function CommonLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex">
        <Sidebar />
        {children}
      </div>
      <Footer />
    </div>
  );
}
