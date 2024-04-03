import { Static, Type } from "@sinclair/typebox";
import { UserSchema } from "./userSchema";
import { ArticleSchema } from "./articleSchema";

export const CommentSchema = Type.Object({
  id: Type.Number(),
  text: Type.String(),
  author:  UserSchema,
  authorId: Type.String(),
  updatedAt: Type.String(),
  createdAt: Type.String(),
  articleId: Type.Number(),
});

export const CommentSchemaList = Type.Array(CommentSchema);

export const CommentSchemaDto = Type.Object({
  text: Type.String(),
  articleId: Type.Number()
});

export type CommentSchemaType = Static<typeof CommentSchema>;
export type CommentSchemaListType = Static<typeof CommentSchemaList>
export type CommentSchemaDtoType = Static<typeof CommentSchemaDto>
