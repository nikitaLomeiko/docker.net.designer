import { IProjectState } from "../types/types";

const STORAGE_KEY = "projects";

export const loadFromStorage = (): IProjectState => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : { currentId: "", projects: [] };
};

export const saveToStorage = (projectState: IProjectState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projectState));
};
