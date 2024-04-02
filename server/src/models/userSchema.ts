import { Role } from "@prisma/client";
import { Static, Type } from "@sinclair/typebox";


export const UserSchema = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String(),
  name: Type.Optional(Type.String()),
  role: Type.Optional(Type.Enum(Role)),
});

export type UserSchemaType = Static<typeof UserSchema>;
