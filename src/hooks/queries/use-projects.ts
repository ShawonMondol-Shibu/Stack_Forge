import { queryOptions } from "@tanstack/react-query";
import { queryKeys } from "@/lib/Query-keys";
import { projectsService } from "@/services/project.service";

/**
 * Query options for fetching all projects.
 */
export const getAllProjects = () =>
  queryOptions({
    queryKey: queryKeys.projects.all,
    queryFn: () => projectsService.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache retention
  });

/**
 * Query options for fetching a single project by ID.
 * Explicity checks for missing ID before execution.
 */
export const getOneProject = (id: string) =>
  queryOptions({
    queryKey: queryKeys.projects.getOne(id),
    queryFn: () => projectsService.getById(id),
    enabled: Boolean(id), // Prevents executing query when id is undefined/null
  });