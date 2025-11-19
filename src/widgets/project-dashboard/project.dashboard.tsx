import { useUnit } from "effector-react";
import { ProjectList } from "./components/project.list";
import { $project, addNewProject } from "entities/project";
import { ProjectForm } from "features/project-form";
import { FileDockerInput } from "./components/file.docker.input";

export const ProjectDashboard: React.FC = () => {
  const { projects, currentId } = useUnit($project);

  return (
    <div className="flex-1 overflow-y-auto">
      <ProjectForm onAddProject={addNewProject} />
      <ProjectList currentId={currentId} projects={projects} />
      <FileDockerInput />
    </div>
  );
};
