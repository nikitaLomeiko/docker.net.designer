import { createEvent, createStore } from "effector";
import { IProject, IProjectState } from "../types/types";
import { loadFromStorage, saveToStorage } from "../utils/project.storage";
import { Node } from "@xyflow/react";

export const addNewProject = createEvent<IProject>();
export const deleteProject = createEvent<string>();
export const selectProject = createEvent<string>();

export const addNewNode = createEvent<Node>();
export const changeNodes = createEvent<Node[]>();
export const changeNode = createEvent<Omit<Node, "type" | "position">>();
export const deleteNode = createEvent<string>();

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
  })
  .on(addNewNode, (project, node) => {
    const updatedProjects = project.projects.map((prj) =>
      prj.id === project.currentId
        ? {
            ...prj,
            nodes: [...(prj.nodes || []), node],
          }
        : prj
    );

    const result = { ...project, projects: updatedProjects };
    saveToStorage(result);
    return result;
  })
  .on(changeNodes, (project, nodes) => {
    const updatedProjects = project.projects.map((prj) =>
      prj.id === project.currentId
        ? {
            ...prj,
            nodes: nodes,
          }
        : prj
    );

    const result = { ...project, projects: updatedProjects };
    saveToStorage(result);
    return result;
  })
  .on(changeNode, (project, node) => {
    const updatedProjects = project.projects.map((prj) =>
      prj.id === project.currentId
        ? {
            ...prj,
            nodes: prj.nodes.map((nod) => (nod.id === node.id ? { ...nod, ...node } : nod)),
          }
        : prj
    );

    const result = { ...project, projects: updatedProjects };
    saveToStorage(result);
    return result;
  })
  .on(deleteNode, (project, id) => {
    const updatedProjects = project.projects.map((prj) =>
      prj.id === project.currentId
        ? {
            ...prj,
            nodes: prj.nodes.filter((nod) => nod.id !== id),
          }
        : prj
    );

    const result = { ...project, projects: updatedProjects };
    saveToStorage(result);
    return result;
  });
