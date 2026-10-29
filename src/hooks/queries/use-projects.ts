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
    select: (data) => data.data,
    staleTime: 1000 * 60 * 5, // 5 minutes cache retention
  });

/**
 * Trending projects (public). Key er prefix `queryKeys.projects.trending`,
 * tai ekbar-i invalidate korle shob limit er cache purono hoye jay.
 */
export const getTrendingProjects = (limit = 10) =>
  queryOptions({
    queryKey: [...queryKeys.projects.trending, limit],
    queryFn: () => projectsService.getTrending(limit),
    select: (data) => data.data,
    staleTime: 1000 * 60 * 5,
  });

/**
 * Query options for fetching a single project by ID.
 * Explicity checks for missing ID before execution.
 */
export const getOneProject = (id: string) =>
  queryOptions({
    queryKey: queryKeys.projects.getOne(id),
    queryFn: () => projectsService.getById(id),
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(id), // Prevents executing query when id is undefined/null
  });