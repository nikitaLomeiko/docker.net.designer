import { deleteProject, IProject, ProjectItem, selectProject } from "entities/project";

interface IProps {
  projects?: IProject[];
  currentId: string;
}

export const ProjectList: React.FC<IProps> = ({ projects = [], currentId }) => {
  return (
    <div className="p-4">
      <div className="flex items-center space-x-2 mb-3">
        <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          Конфигурации ({projects?.length || "нет"})
        </h3>
      </div>
      <div className="space-y-2">
        {projects.map((project) => (
          <ProjectItem
            id={project.id}
            name={project.name}
            isCurrent={project.id === currentId}
            onDelete={() => deleteProject(project.id)}
            onSelect={() => selectProject(project.id)}
            nodeCount={project.nodes.length}
          />
        ))}
      </div>
    </div>
  );
};
