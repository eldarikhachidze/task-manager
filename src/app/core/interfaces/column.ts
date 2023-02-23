export interface Column {
  id: number;
  name: string;
  description: string;
  position: number;
  taskStatus: [];
  boardId: number;
  board: string;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
