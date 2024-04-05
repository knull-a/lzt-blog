import { Static, Type } from "@sinclair/typebox";

export const paginationSchema = Type.Object({
  page: Type.Optional(Type.Number()),
  limit: Type.Optional(Type.Number()),
});

export type PaginationSchemaType = Static<typeof paginationSchema>;
