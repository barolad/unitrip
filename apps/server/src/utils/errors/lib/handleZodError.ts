import type { Context } from "hono";
import type { ZodError } from "zod";
import { parseZodErrorIssues } from "./parseZodErrorIssues";

export function handleZodError(
  result:
    | {
        success: true;
        data: unknown;
      }
    | {
        success: false;
        error: ZodError;
      },
  c: Context,
) {
  if (!result.success) {
    const error = parseZodErrorIssues(result.error.issues);
    return c.json(
      {
        code: "BAD_REQUEST",
        message: error,
      },
      { status: 400 },
    );
  }
}
