'use client'
import { formType } from "@/components/Shared/dashboard/tasks/TaskForm";
import { toast } from "@/components/ui/toast";
import { apiService } from "@/lib/api-routes/apis";
import { taskType } from "@/lib/types/task-type";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface TaskContextType {
  tasks: taskType[];
  setTasks: Dispatch<SetStateAction<taskType[]>>;
  handleDelete: (id: string)=> void,
  completedTasks: taskType[],
  inProgressTasks: taskType[],
  todoTasks: taskType[],
  isPending: boolean,
   mutate: (data: unknown | any)=> void,
  
}

type TasksType = {
  data: taskType[];
};
type AddTaskResponse = {
  message: string;
  data: taskType;
};


const defaultContext = {
  tasks: [],
  setTasks: () => {},
    handleDelete: ()=> {},
    completedTasks: [],
    inProgressTasks: [],
    todoTasks: [],
    isPending: true,
    mutate: ()=>{}
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

  

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-task"],
    mutationFn: (data: formType) =>
      apiService<AddTaskResponse>({
        endpoint: "/tasks",
        method: "POST",
        body: data,
      }),
    onSuccess: (data) => {
      setTasks((prev) => [...prev, data?.data]);
      toast.add({
        type: "success",
        title: `${data?.message}`,
      });
    },
    onError: (err) => {
      toast.add({
        type: "error",
        title: `${err.message}`,
      });
      console.log(err.message);
    },
  });
  

  const handleDelete = (id: string)=>{
    const deletedTask = tasks.filter((task)=> task.id != id)
    setTasks(deletedTask)
  }

  const completedTasks = tasks.filter((task)=> task.status === "done")
  const inProgressTasks = tasks.filter((task)=> task.status === "in_progress")
  const todoTasks = tasks.filter((task)=> task.status === "todo")

  return (
    <taskContext.Provider value={{ tasks, setTasks, handleDelete, completedTasks, inProgressTasks, todoTasks, isPending, mutate }}>
      {children}
    </taskContext.Provider>
  );
}

export const useTaskContext = () => useContext(taskContext);
