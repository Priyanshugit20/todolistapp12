
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Task, TaskCategory } from "../types";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";

interface TaskContextProps {
  tasks: Task[];
  categories: TaskCategory[];
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  addCategory: (category: Omit<TaskCategory, "id">) => TaskCategory;
  deleteCategory: (id: string) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

// Sample initial categories
const initialCategories: TaskCategory[] = [
  { id: "1", name: "Work", color: "#9b87f5" },
  { id: "2", name: "Personal", color: "#4CAF50" },
  { id: "3", name: "Shopping", color: "#F44336" },
  { id: "4", name: "Errands", color: "#FFEB3B" },
  { id: "5", name: "Health", color: "#2196F3" },
];

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("taskquest-tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [categories, setCategories] = useState<TaskCategory[]>(() => {
    const savedCategories = localStorage.getItem("taskquest-categories");
    return savedCategories ? JSON.parse(savedCategories) : initialCategories;
  });

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("taskquest-tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Persist categories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("taskquest-categories", JSON.stringify(categories));
  }, [categories]);

  const addTask = (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    };
    setTasks([newTask, ...tasks]);
    toast({
      title: "Task added",
      description: "Your task has been added successfully.",
    });
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, ...updatedTask, updatedAt: new Date().toISOString() }
          : task
      )
    );
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully.",
    });
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast({
      title: "Task deleted",
      description: "Your task has been deleted successfully.",
      variant: "destructive",
    });
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
    
    const task = tasks.find(t => t.id === id);
    if (task) {
      toast({
        title: task.completed ? "Task incomplete" : "Task completed",
        description: task.completed 
          ? "Task marked as incomplete." 
          : "Great job! Task marked as complete.",
      });
    }
  };

  const addCategory = (category: Omit<TaskCategory, "id">) => {
    const newCategory = { ...category, id: uuidv4() };
    setCategories([...categories, newCategory]);
    toast({
      title: "Category added",
      description: `The "${category.name}" category has been added.`,
    });
    return newCategory;
  };

  const deleteCategory = (id: string) => {
    // Update tasks that had this category to have no category
    setTasks(
      tasks.map((task) =>
        task.categoryId === id
          ? { ...task, categoryId: null, updatedAt: new Date().toISOString() }
          : task
      )
    );
    
    // Remove the category
    const category = categories.find(c => c.id === id);
    setCategories(categories.filter((category) => category.id !== id));
    
    if (category) {
      toast({
        title: "Category deleted",
        description: `The "${category.name}" category has been deleted.`,
        variant: "destructive",
      });
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        categories,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        addCategory,
        deleteCategory,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
