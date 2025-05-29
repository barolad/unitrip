import { ZodIssue } from "zod";

// Props to cal.com: https://github.com/calcom/cal.com/blob/5d325495a9c30c5a9d89fc2adfa620b8fde9346e/packages/lib/server/getServerErrorFromUnknown.ts#L17
export function parseZodErrorIssues(issues: ZodIssue[]): string {
  return issues
    .map((i) =>
      i.code === "invalid_union"
        ? i.unionErrors.map((ue) => parseZodErrorIssues(ue.issues)).join("; ")
        : i.code === "unrecognized_keys"
          ? i.message
          : `${i.path.length ? `${i.code} in '${i.path}': ` : ""}${i.message}`,
    )
    .join("; ");
}
