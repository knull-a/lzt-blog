import { Static, Type } from "@sinclair/typebox";

export const idSchema = Type.Object({
  id: Type.Number(),
});

export type IdSchemaType = Static<typeof idSchema>
