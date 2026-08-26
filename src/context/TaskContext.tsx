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
}

type TasksType = {
  data: [];
};

const defaultContext = {
  tasks: [],
  setTasks: () => {},
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


  return (
    <taskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </taskContext.Provider>
  );
}

export const useTaskContext = () => useContext(taskContext);
