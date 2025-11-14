import { useUnit } from "effector-react";
import { $project } from "../store";
import { IProject } from "../types";

export const useCurrentProject = (): IProject | undefined => {
  const { currentId, projects } = useUnit($project);
  const project = projects.find((project) => project.id === currentId);
  return project;
};
