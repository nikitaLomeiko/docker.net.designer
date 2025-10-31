import { createEvent, createStore } from "effector";
import { IProject, IProjectState } from "../types/types";
import { loadFromStorage, saveToStorage } from "../utils/project.storage";

export const addNewProject = createEvent<IProject>();
export const deleteProject = createEvent<string>();
export const selectProject = createEvent<string>();

export const $project = createStore<IProjectState>(loadFromStorage())
  .on(addNewProject, (project, newProject) => {
    const updatedProjects = [...project.projects, newProject];
    const result = { ...project, projects: updatedProjects };
    saveToStorage(result);
    return result;
  })
  .on(deleteProject, (project, projectId) => {
    const updatedProjects = project.projects.filter((project) => project.id !== projectId);
    const result = { ...project, projects: updatedProjects };
    saveToStorage(result);
    return result;
  })
  .on(selectProject, (project, id) => {
    const result = { ...project, currentId: id };
    saveToStorage(result);
    return result;
  });
