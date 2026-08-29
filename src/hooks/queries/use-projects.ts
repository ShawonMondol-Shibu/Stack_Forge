import { useProjectContext } from "@/context/ProjectContext";
import { queryKeys } from "@/lib/Query-keys";
import { projectsService } from "@/services/project.service";
import { queryOptions } from "@tanstack/react-query";

export const getAllProjects = ()=> {
    return queryOptions({
        queryKey: queryKeys.projects.all,
        queryFn: projectsService.getAll,
    });
}

export const getOneProject = (id: string)=> queryOptions({
    queryKey: queryKeys.projects.getOne(id),
    queryFn: ()=> projectsService.getById(id)
})