'use client'
import { apiService } from "@/lib/api-routes/apis";
import { taskType } from "@/lib/types/task-type";
import { useQuery } from "@tanstack/react-query";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface TaskContextType {
  tasks: taskType[];
  setTasks: Dispatch<SetStateAction<taskType[]>>;
  handleDelete: (id: string)=> void,
  completedTasks: taskType[],
  inProgressTasks: taskType[],
  todoTasks: taskType[],
}

type TasksType = {
  data: [];
};

const defaultContext = {
  tasks: [],
  setTasks: () => {},
    handleDelete: ()=> {},
    completedTasks: [],
    inProgressTasks: [],
    todoTasks: [],
};

const taskContext = createContext<TaskContextType>(defaultContext);

export default function TaskContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] = useState<taskType[]>([]);
  const { data } = useQuery({
    queryKey: ["all-tasks"],
    queryFn: async () => apiService<TasksType>({ endpoint: "/tasks" }),
    select: (data) => setTasks(data.data),
  });

  const handleDelete = (id: string)=>{
    const deletedTask = tasks.filter((task)=> task.id != id)
    setTasks(deletedTask)
  }

  const completedTasks = tasks.filter((task)=> task.status === "done")
  const inProgressTasks = tasks.filter((task)=> task.status === "in_progress")
  const todoTasks = tasks.filter((task)=> task.status === "todo")

  return (
    <taskContext.Provider value={{ tasks, setTasks, handleDelete, completedTasks, inProgressTasks, todoTasks }}>
      {children}
    </taskContext.Provider>
  );
}

export const useTaskContext = () => useContext(taskContext);
