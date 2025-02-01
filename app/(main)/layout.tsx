import NaviationSidebar from "@/components/navigation/navigation-sidebar";
import React, { ReactNode } from "react";

async function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NaviationSidebar />
      </div>
      <main className="md:pl-[72px] h-full">{children}</main>
    </div>
  );
}

export default MainLayout;
