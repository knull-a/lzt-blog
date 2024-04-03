import { Role } from "@prisma/client";
import { Static, Type } from "@sinclair/typebox";

export const UserSchema = Type.Object({
  id: Type.Number(),
  email: Type.String({ format: "email" }),
  password: Type.String(),
  name: Type.Optional(Type.String()),
  role: Type.Optional(Type.Enum(Role)),
});

export const UserSchemaDto = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String(),
  name: Type.Optional(Type.String()),
  role: Type.Optional(Type.Enum(Role)),
});

export const UserSchemaWithTokens = Type.Object({
  id: Type.Number(),
  email: Type.String({ format: "email" }),
  password: Type.String(),
  name: Type.Optional(Type.String()),
  role: Type.Optional(Type.Enum(Role)),
  accessToken: Type.String(),
  refreshToken: Type.String(),
});

export type UserSchemaTypeDto = Static<typeof UserSchemaDto>;
export type UserSchemaType = Static<typeof UserSchema>;
