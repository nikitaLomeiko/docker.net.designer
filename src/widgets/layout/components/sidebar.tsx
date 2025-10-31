import React from "react";
import { ProjectItem } from "entities/project";
import { ProjectForm } from "features/project-form";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<IProps> = (props) => {
  const { isOpen, onClose } = props;

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      <div
        className={`
        fixed inset-y-0 top-2 left-0 z-50 w-80
        lg:relative lg:translate-x-0 lg:z-auto
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="w-full h-full bg-white/95 backdrop-blur-xl border-r border-gray-200 rounded-r-2xl shadow-lg flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                  <svg
                    className="w-5 h-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M2 12h20M2 6h20M2 18h20" />
                    <rect x="4" y="4" width="4" height="4" rx="1" />
                    <rect x="4" y="10" width="4" height="4" rx="1" />
                    <rect x="4" y="16" width="4" height="4" rx="1" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-gray-900">Docker Compose</h2>
              </div>
              <button onClick={onClose} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">Конструктор docker-compose файлов</p>
          </div>

          <ProjectForm />

          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <svg
                  className="w-4 h-4 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Конфигурации (5)</h3>
              </div>

              <div className="space-y-2">
                <ProjectItem id="1" name="docker-compose.yml" onDelete={console.log} onSelect={console.log} />
                <ProjectItem id="2" name="flowers.ru.yml" onDelete={console.log} onSelect={console.log} />
                <ProjectItem id="3" name="telegram-bot.yml" onDelete={console.log} onSelect={console.log} isCurrent />
                <ProjectItem id="4" name="magazin.yml" onDelete={console.log} onSelect={console.log} />
                <ProjectItem id="5" name="docker-compose2.yml" onDelete={console.log} onSelect={console.log} />
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 mb-1">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Docker Compose Builder</span>
              </div>
              <div className="text-xs text-gray-400">v1.0.0</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
