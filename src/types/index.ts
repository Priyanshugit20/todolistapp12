
export type TaskCategory = {
  id: string;
  name: string;
  color: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string | null;
  categoryId: string | null;
  createdAt: string;
  updatedAt: string;
};
