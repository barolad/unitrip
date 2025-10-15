import { z } from "@hono/zod-openapi";

// Generic pagination metadata schema
export const PaginationMetadataSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
});

// Generic pagination response schema
export const createPaginationResponseSchema = <T extends z.ZodTypeAny>(
  dataSchema: T
) =>
  z.object({
    data: z.array(dataSchema),
    pagination: PaginationMetadataSchema,
  });

// Type for pagination metadata
export type PaginationMetadata = z.infer<typeof PaginationMetadataSchema>;

// Generic type for paginated response
export type PaginationData<T> = {
  data: T[];
  pagination: PaginationMetadata;
};
