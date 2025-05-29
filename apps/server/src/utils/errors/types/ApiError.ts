import { HTTPException } from "hono/http-exception";
import { ErrorCode } from "./ErrorCode";
import { codeToStatus } from "../lib/codeToStatus";

export class ApiError extends HTTPException {
  public readonly code: ErrorCode;

  constructor({
    code,
    message,
  }: {
    code: ErrorCode;
    message: HTTPException["message"];
  }) {
    const status = codeToStatus(code);
    super(status, { message });
    this.code = code;
  }
}
