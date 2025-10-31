import React from "react";
import { Logotype } from "shared/ui/logotype";

interface IProps {
  onMenuToggle: () => void;
}

export const Header: React.FC<IProps> = ({ onMenuToggle }) => {
  return (
    <header className="relative px-3 sm:px-4 pt-3 sm:pt-4">
      <div className="absolute inset-0 mx-3 sm:mx-4 mt-3 sm:mt-4 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-sm"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center space-x-3 sm:space-x-6 justify-between h-16 sm:h-20 px-3 sm:px-6">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-xl bg-white/80 hover:bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-gray-800 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Logotype />
        </div>
      </div>
    </header>
  );
};
