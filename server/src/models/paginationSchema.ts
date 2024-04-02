import { Static, Type } from "@sinclair/typebox";

export const paginationSchema = Type.Object({
  page: Type.Number(),
  limit: Type.Number(),
});

export type PaginationSchemaType = Static<typeof paginationSchema>;
