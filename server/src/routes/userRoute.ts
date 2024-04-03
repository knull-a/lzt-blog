import { FastifyInstance, FastifyRequest } from "fastify";
import {
  UserSchema,
  UserSchemaDto,
  UserSchemaType,
  UserSchemaTypeDto,
  UserSchemaWithTokens,
} from "../models/userSchema";
import {
  getUserProfile,
  loginUser,
  registerUser,
  refreshToken,
  updateUserProfile,
} from "../controllers/userController";
import { Type } from "@sinclair/typebox";

async function userRoute(fastify: FastifyInstance) {
  fastify.post(
    "/users/register",
    {
      schema: {
        body: UserSchemaDto,
        response: {
          200: UserSchema,
        },
      },
    },
    (req: FastifyRequest<{ Body: UserSchemaTypeDto }>, rep) =>
      registerUser(req, rep, fastify)
  );

  fastify.post(
    "/users/login",
    {
      schema: {
        body: UserSchema,
        response: {
          200: UserSchema,
        },
      },
    },
    (req: FastifyRequest<{ Body: UserSchemaType }>, rep) =>
      loginUser(req, rep, fastify)
  );

  fastify.post(
    "/users/refresh",
    {
      schema: {
        body: { refreshToken: Type.String() },
        response: {
          201: { accessToken: Type.String() },
        },
      },
    },
    (req: FastifyRequest<{ Body: { refreshToken: string } }>, rep) =>
      refreshToken(req, rep, fastify)
  );

  fastify.get(
    "/users/me",
    {
      preHandler: [fastify.authenticate],
    },
    getUserProfile
  );

  fastify.patch(
    "/users/me",
    {
      preHandler: [fastify.authenticate],
      schema: {
        body: Type.Partial(UserSchemaDto),
        response: {
          201: Type.Partial(UserSchemaWithTokens),
        },
      },
    },
    (req: FastifyRequest<{ Body: Partial<UserSchemaType> }>, rep) =>
      updateUserProfile(req, rep, fastify)
  );
}

export default userRoute;
