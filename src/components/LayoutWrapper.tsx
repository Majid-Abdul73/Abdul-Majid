"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
// import CustomCursor from "@/components/CustomCursor";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <main className="flex-1 min-w-0 bg-background text-foreground">{children}</main>;
  }

  return (
    <div className="dark flex flex-col min-h-screen bg-background text-foreground w-full">
      {/* <CustomCursor /> */}
      <NavBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
