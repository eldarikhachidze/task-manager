import {Project} from "./project";
import {ETaskStatus} from "../enums/etask-status.enum";

export interface Board {
  id: number;
  name: string;
  description: string;
  position: number;
  projectId: number;
  project: Project;
  columns: Column[];
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface Column {
  id: number;
  name: string;
  description: string;
  position: number;
  taskStatus: ETaskStatus;
  boardId: number;
  board: string;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
