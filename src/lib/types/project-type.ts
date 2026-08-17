export interface ProjectType {
    id: string;
    userId:string;
    name:string;
    description?:string;
    techStack:string[];
    image?: string
}