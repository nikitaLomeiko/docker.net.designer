import { useState } from "react";
import { toolbarConfig } from "../model/config/toolbar.config";
import { ToolbarNode } from "./components/toolbar.node";

export const Toolbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`
          bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-200/60 
          shadow-2xl shadow-black/10 px-2 py-2 transition-all duration-300
          ${isHovered ? "shadow-2xl shadow-black/20 scale-105" : "shadow-lg"}
          hover:shadow-2xl hover:shadow-black/20 hover:scale-105
        `}
        >
          <div className="flex items-center space-x-1">
            {toolbarConfig.map((tool) => (
              <ToolbarNode {...tool} toolsCount={toolbarConfig.length} />
            ))}
          </div>
        </div>

        <div
          className={`
          absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 
          rounded-2xl blur-xl transition-opacity duration-300
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
        />
      </div>
    </>
  );
};
