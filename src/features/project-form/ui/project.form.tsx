import { IProject } from "entities/project";
import { useState } from "react";
import { generateId } from "shared/utils/generate.id";

interface IProps {
  onAddProject: (project: IProject) => void;
}

export const ProjectForm: React.FC<IProps> = ({ onAddProject }) => {
  const [projectName, setProjectName] = useState<string>("");

  const handleCreateProject = () => {
    if (projectName.trim()) {
      const newProject: IProject = {
        id: generateId(),
        name: projectName.trim(),
        edges: [],
        nodes: [],
      };
      onAddProject(newProject);
      setProjectName("");
    }
  };

  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex flex-col gap-3">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <label className="text-sm font-medium text-gray-700">Новый проект</label>
        </div>
        <form className="flex flex-col gap-3">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Введите название конфигурации..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            onKeyPress={(e) => e.key === "Enter" && handleCreateProject()}
          />
          <button
            onClick={handleCreateProject}
            disabled={!projectName.trim()}
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow hover:shadow-md transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow flex items-center justify-center space-x-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>Создать конфигурацию</span>
          </button>
        </form>
      </div>
    </div>
  );
};
