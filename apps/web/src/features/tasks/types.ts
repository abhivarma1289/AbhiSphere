export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "doing" | "done";

export interface Task {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
}
