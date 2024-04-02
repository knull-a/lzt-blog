import { Static, Type } from "@sinclair/typebox";

export const ArticleSchema = Type.Object({
  title: Type.String(),
  text: Type.String(),
});

export const ArticleSchemaList = Type.Array(ArticleSchema);

export type ArticleSchemaListType = Static<typeof ArticleSchemaList>;
export type ArticleSchemaType = Static<typeof ArticleSchema>;
