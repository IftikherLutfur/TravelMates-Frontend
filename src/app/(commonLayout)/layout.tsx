import { Footer } from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { ReactNode } from "react";

export default function CommonLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4">
       <Navbar />
      {children}
      <Footer/>
    </div>
  );
}
