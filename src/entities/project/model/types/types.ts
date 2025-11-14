import { Edge, Node } from "@xyflow/react";

export interface IProject {
  id: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
}

export interface IProjectState {
  projects: IProject[];
  currentId: string;
}
