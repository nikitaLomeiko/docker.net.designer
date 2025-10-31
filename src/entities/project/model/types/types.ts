export interface IProject {
  id: string;
  name: string;
}

export interface IProjectState {
  projects: IProject[];
  currentId: string;
}
