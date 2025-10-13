import { createRoute } from "@hono/zod-openapi";

const getEventsRoute = createRoute({
    method: "GET",
    path: "/",
    responses: {
        200: {
            content: {
                "application/json": {
            }
    }}}
})