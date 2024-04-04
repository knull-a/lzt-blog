import { Static, Type } from "@sinclair/typebox";
import { UserSchema } from "./userSchema";
import { CommentSchemaWithoutAuthor } from "./commentSchema";

export const ArticleSchemaDto = Type.Object({
  title: Type.String(),
  text: Type.String(),
});

export const ArticleSchema = Type.Object({
  id: Type.Number(),
  title: Type.String(),
  text: Type.String(),
  author: UserSchema,
  updatedAt: Type.String(),
  createdAt: Type.String(),
  comments: CommentSchemaWithoutAuthor,
});

export const ArticleSchemaList = Type.Array(ArticleSchema);

export type ArticleSchemaListType = Static<typeof ArticleSchemaList>;
export type ArticleSchemaType = Static<typeof ArticleSchema>;
export type ArticleSchemaDtoType = Static<typeof ArticleSchemaDto>;
