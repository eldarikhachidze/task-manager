import {User} from "./user";
import {Project} from "./project";
import {IIssueType} from "./issue-type";
import {Epic} from "./epic";

export interface Task {
  id: number;
  name: string;
  description: string;
  issueTypeId: number;
  issueType?: IIssueType;
  epicId: number;
  epic?: Epic;
  projectId?: number;
  project?: Project;
  boardId: number;
  board: string;
  boardColumnId: number;
  boardColumn: string;
  isBacklog: boolean;
  priority: string;
  taskStatus: string;
  assigneeId: number;
  assignee: User;
  reporterId: number;
  reporter: User;
  createdById: number;
  createdBy: User;
  deletedById: number;
  deletedBy: User;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  taskProperty: taskProperty[];
}

export interface taskProperty {
  id: number;
  name: string;
  filedName: string;
  value: string;
  isRequired: boolean;
}
