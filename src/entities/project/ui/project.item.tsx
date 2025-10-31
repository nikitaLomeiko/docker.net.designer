import { IProject } from "../model/types/types";

interface IProps extends IProject {
  onDelete: () => void;
  onSelect: () => void;
  isCurrent?: boolean;
}

export const ProjectItem: React.FC<IProps> = (props) => {
  const { id, name, onDelete, onSelect, isCurrent = false } = props;
  return (
    <div
      key={id}
      onClick={onSelect}
      className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer group ${
        isCurrent
          ? "bg-blue-50 border-blue-200 shadow-sm"
          : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div
            className={`p-1.5 rounded ${
              isCurrent ? "bg-blue-500" : "bg-gray-400 group-hover:bg-blue-400"
            } transition-colors`}
          >
            <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
              <line x1="7" y1="2" x2="7" y2="22" />
              <line x1="17" y1="2" x2="17" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <line x1="2" y1="7" x2="7" y2="7" />
              <line x1="2" y1="17" x2="7" y2="17" />
              <line x1="17" y1="17" x2="22" y2="17" />
              <line x1="17" y1="7" x2="22" y2="7" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-gray-900 truncate">{name}</div>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-gray-500">25 нод</span>
            </div>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="opacity-0 group-hover:opacity-100 p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all duration-200"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
          </svg>
        </button>
      </div>
    </div>
  );
};
