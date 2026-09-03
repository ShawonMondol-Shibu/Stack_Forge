export type taskType ={
    id: string,
    userId?:string,
    title?: string,
    priority?: string,
    status?: string,
    createdAt?: number | Date | undefined,
    updatedAt?: number | Date | undefined,
}


export type CreateTaskPayload = Omit<taskType, "id" | "createdAt" | "updatedAt">;

export type UpdateTaskPayload = Partial<CreateTaskPayload>;