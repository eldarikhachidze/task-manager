import {Column} from "./column";

export interface Board {
}
import {Project} from "./project";



export interface Board {
  id: number;
  name: string;
  description: string;
  position: number;
  projectId: number;
  project: Project;
  columns: Column[];
  tasks: [];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

