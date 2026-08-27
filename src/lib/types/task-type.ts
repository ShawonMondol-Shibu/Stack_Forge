export type taskType ={
    id: string,
    userId?:string,
    title?: string,
    priority?: string,
    status?: string,
    createdAt?: number | Date | undefined,
    updatedAt?: number | Date | undefined,
}