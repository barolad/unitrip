import type { ContentfulStatusCode } from "hono/utils/http-status";
import type { ErrorCode } from "../types/ErrorCode";

export function statusToCode(status: ContentfulStatusCode): ErrorCode {
  switch (status) {
    case 400:
      return "BAD_REQUEST";
    case 401:
      return "UNAUTHORIZED";
    case 403:
      return "FORBIDDEN";
    case 404:
      return "NOT_FOUND";
    case 405:
      return "METHOD_NOT_ALLOWED";
    case 429:
      return "TOO_MANY_REQUESTS";
    case 500:
      return "INTERNAL_SERVER_ERROR";
    default:
      return "INTERNAL_SERVER_ERROR";
  }
}
