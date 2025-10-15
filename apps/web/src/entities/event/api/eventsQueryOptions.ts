import { api } from "@/shared/lib/api";
import { queryOptions } from "@tanstack/react-query";

export const eventsQueryOptions = queryOptions({
  queryKey: ["events"],
  queryFn: () => api.events.$get(),
});
