import { taskType } from "@/lib/types/task-type";
import { create } from "zustand";

export interface UseTaskStore {
  tasks: taskType[];
  setTask: (task: taskType[]) => void;
  removeTask: (id: string) => void;
  completedTasks: taskType[];
  inProgressTasks: taskType[];
  todoTasks: taskType[];
}

export const useTaskStore = create<UseTaskStore>((set) => ({
  tasks: [],
  completedTasks: [],
  inProgressTasks: [],
  todoTasks: [],
  setTask: (task) => set({ tasks: task }),
  removeTask: (id: string) =>
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
  setCompletedTasks: (tasks: taskType[]) => set({ completedTasks: tasks.filter((task) => task.status === "done") }),
  setInProgressTasks: (tasks: taskType[]) => set({ inProgressTasks: tasks.filter((task) => task.status === "in_progress") }),
  setTodoTasks: (tasks: taskType[]) => set({ todoTasks: tasks.filter((task) => task.status === "todo") }),
}));
