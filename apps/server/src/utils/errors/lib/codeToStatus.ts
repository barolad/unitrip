import type { ContentfulStatusCode } from "hono/utils/http-status";
import type { ErrorCode } from "../types/ErrorCode";

export function codeToStatus(code: ErrorCode): ContentfulStatusCode {
  switch (code) {
    case "BAD_REQUEST":
      return 400;
    case "UNAUTHORIZED":
      return 401;
    case "FORBIDDEN":
      return 403;
    case "NOT_FOUND":
      return 404;
    case "METHOD_NOT_ALLOWED":
      return 405;
    case "TOO_MANY_REQUESTS":
      return 429;
    case "INTERNAL_SERVER_ERROR":
      return 500;
    default:
      return 500;
  }
}
