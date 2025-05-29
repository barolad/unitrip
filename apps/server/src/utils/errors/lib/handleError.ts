import { Context } from "hono";
import { ZodError } from "zod";
import { HTTPException } from "hono/http-exception";
import { parseZodErrorIssues } from "./parseZodErrorIssues";
import { statusToCode } from "../statusToCode";
import { ApiError } from "../types/ApiError";

export function handleError(error: Error, c: Context) {
  console.log("111");
  if (error instanceof ZodError) {
    console.log("222");
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
