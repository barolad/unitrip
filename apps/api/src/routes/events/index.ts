import { createRouter } from "@/lib/createRouter";
import { getAllEventsRoute, getAllEventsHandler } from "./get_all";
import { postEventRoute, postEventHandler } from "./post";
import { putEventRoute, putEventHandler } from "./put";
import { getEventHandler, getEventRoute } from "./get";

export const eventsRouter = createRouter()
  .basePath("/events")
  .openapi(getAllEventsRoute, getAllEventsHandler)
  .openapi(getEventRoute, getEventHandler)
  .openapi(postEventRoute, postEventHandler)
  .openapi(putEventRoute, putEventHandler);
