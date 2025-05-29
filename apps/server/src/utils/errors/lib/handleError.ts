import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";
import { statusToCode } from "../lib/statusToCode";
import { ApiError } from "../types/ApiError";
import { parseZodErrorIssues } from "./parseZodErrorIssues";

export function handleError(error: Error, c: Context) {
  console.log(error);
  if (error instanceof ZodError) {
    return c.json(
      {
        code: "BAD_REQUEST",
        message: parseZodErrorIssues(error.issues),
      },
      { status: 400 },
    );
  }
  if (error instanceof ApiError) {
    const code = statusToCode(error.status);
    return c.json(
      {
        code,
        message: error.message,
      },
      { status: error.status },
    );
  }
  if (error instanceof HTTPException) {
    const code = statusToCode(error.status);

    return c.json(
      {
        code,
        message: error.message,
      },
      { status: error.status },
    );
  }
  return c.json(
    {
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error",
    },
    { status: 500 },
  );
}
