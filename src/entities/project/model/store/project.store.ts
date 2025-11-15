import { createEvent, createStore } from "effector";
import { IProject, IProjectState } from "../types/types";
import { loadFromStorage, saveToStorage } from "../utils/project.storage";
import { Edge, Node } from "@xyflow/react";

export const addNewProject = createEvent<IProject>();
export const deleteProject = createEvent<string>();
export const selectProject = createEvent<string>();

export const addNewNode = createEvent<Node>();
export const changeNodes = createEvent<Node[]>();
export const changeNode = createEvent<Omit<Node, "type" | "position">>();
export const deleteNode = createEvent<string>();

export const addNewEdge = createEvent<Edge>();
export const changeEdge = createEvent<Edge>();

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
  })
  .on(addNewEdge, (project, edge) => {
    const updatedProjects = project.projects.map((prj) =>
      prj.id === project.currentId
        ? {
            ...prj,
            edges: [...(prj.edges || []), edge],
          }
        : prj
    );

    const result = { ...project, projects: updatedProjects };
    saveToStorage(result);
    return result;
  })
  .on(changeEdge, (project, edge) => {
    const updatedProjects = project.projects.map((prj) =>
      prj.id === project.currentId
        ? {
            ...prj,
            edges: prj.edges.map((edg) => (edg.id === edg.id ? { ...edg, ...edge } : edg)),
          }
        : prj
    );

    const result = { ...project, projects: updatedProjects };
    saveToStorage(result);
    return result;
  });
