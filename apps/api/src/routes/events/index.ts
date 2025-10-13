import { createRouter } from "@/lib/createRouter";
import { getAllEventsRoute, getAllEventsHandler } from "./get_all";

export const eventsRouter = createRouter()
  .basePath("/events")
  .openapi(getAllEventsRoute, getAllEventsHandler);
