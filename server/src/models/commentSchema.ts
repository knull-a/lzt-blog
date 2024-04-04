import { Static, Type } from "@sinclair/typebox";
import { UserSchema } from "./userSchema";

const BaseCommentSchema = Type.Object({
  id: Type.Number(),
  text: Type.String(),
  authorId: Type.String(),
  updatedAt: Type.String(),
  createdAt: Type.String(),
  articleId: Type.Number(),
});

export const CommentSchema = Type.Intersect([
  BaseCommentSchema,
  Type.Object({
    author: UserSchema,
  }),
]);

export const CommentSchemaWithoutAuthor = BaseCommentSchema;

export const CommentSchemaList = Type.Array(CommentSchema);

export const CommentSchemaDto = Type.Object({
  text: Type.String(),
  articleId: Type.Number(),
});

export type CommentSchemaType = Static<typeof CommentSchema>;
export type CommentSchemaListType = Static<typeof CommentSchemaList>;
export type CommentSchemaDtoType = Static<typeof CommentSchemaDto>;
