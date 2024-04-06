import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from "fastify";
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
  getUsers,
  deleteUser,
} from "../controllers/userController";
import { Type } from "@sinclair/typebox";
import { ArticleSchemaList } from "../models/articleSchema";
import { idSchema } from "../models/idSchema";

async function userRoute(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  path: string
) {
  fastify.post(
    `${path}/register`,
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
    `${path}/login`,
    {
      schema: {
        body: UserSchemaDto,
        response: {
          200: UserSchema,
        },
      },
    },
    (req: FastifyRequest<{ Body: UserSchemaType }>, rep) =>
      loginUser(req, rep, fastify)
  );

  fastify.post(
    `${path}/refresh`,
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
    `${path}/me`,
    {
      preHandler: [fastify.authenticate],
    },
    getUserProfile
  );

  fastify.patch(
    `${path}/me`,
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

  fastify.get(
    path,
    {
      preHandler: [fastify.authenticate],
      schema: {
        response: {
          200: Type.Array(UserSchema),
        },
      },
    },
    getUsers
  );

  fastify.delete(
    `${path}/:id`,
    {
      preHandler: [fastify.authenticate],
      schema: {
        response: {
          200: Type.String(),
        },
        params: idSchema,
      },
    },
    deleteUser
  );
}

export default userRoute;
