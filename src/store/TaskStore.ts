import { taskType } from "@/lib/types/task-type";
import { create } from "zustand";

export interface UseTaskStore {
  tasks: taskType[];
  completedTasks: taskType[];
  inProgressTasks: taskType[];
  todoTasks: taskType[];
  setTask: (tasks: taskType[]) => void;
  removeTask: (id: string) => void;
}

const filterTasks = (tasks: taskType[]) => ({
  tasks,
  completedTasks: tasks.filter((t) => t.status === "done"),
  inProgressTasks: tasks.filter((t) => t.status === "in_progress"),
  todoTasks: tasks.filter((t) => t.status === "todo"),
});

export const useTaskStore = create<UseTaskStore>((set) => ({
  ...filterTasks([]),
  setTask: (tasks) => set(filterTasks(tasks)),
  removeTask: (id) =>
    set((state) => filterTasks(state.tasks.filter((task) => task.id !== id))),
}));