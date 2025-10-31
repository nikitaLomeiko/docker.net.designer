import { useState } from "react";
import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className="flex h-[98vh] bg-gray-50">
      <Sidebar isOpen={openSidebar} onClose={() => setOpenSidebar(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={() => setOpenSidebar(!openSidebar)} />

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};
