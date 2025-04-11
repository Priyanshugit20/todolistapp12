
import React, { createContext, useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";

const TaskContext = createContext(undefined);

// Sample initial categories
const initialCategories = [
  { id: "1", name: "Work", color: "#9b87f5" },
  { id: "2", name: "Personal", color: "#4CAF50" },
  { id: "3", name: "Shopping", color: "#F44336" },
  { id: "4", name: "Errands", color: "#FFEB3B" },
  { id: "5", name: "Health", color: "#2196F3" },
];

export const TaskProvider = ({ children }) => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("taskquest-tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [categories, setCategories] = useState(() => {
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

  const addTask = (task) => {
    const now = new Date().toISOString();
    const newTask = {
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

  const updateTask = (id, updatedTask) => {
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

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast({
      title: "Task deleted",
      description: "Your task has been deleted successfully.",
      variant: "destructive",
    });
  };

  const toggleTaskCompletion = (id) => {
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

  const addCategory = (category) => {
    const newCategory = { ...category, id: uuidv4() };
    setCategories([...categories, newCategory]);
    toast({
      title: "Category added",
      description: `The "${category.name}" category has been added.`,
    });
    return newCategory;
  };

  const deleteCategory = (id) => {
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
