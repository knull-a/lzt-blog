import { FastifyInstance, FastifyPluginOptions } from "fastify";
import {
  CommentSchema,
  CommentSchemaList,
  CommentSchemaDto,
} from "../models/commentSchema";
import { idSchema } from "../models/idSchema";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controllers/commentController";
import { Type } from "@sinclair/typebox";

async function commentRoute(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  path: string
) {
  fastify.get(
    path,
    {
      schema: {
        response: {
          200: CommentSchemaList,
        },
      },
      preHandler: [fastify.authenticate],
    },
    getComments
  );

  fastify.post(
    path,
    {
      schema: {
        body: CommentSchemaDto,
        response: {
          201: CommentSchemaDto,
        },
      },
      preHandler: [fastify.authenticate],
    },
    createComment
  );

  fastify.patch(
    `${path}/:id`,
    {
      schema: {
        body: Type.Partial(CommentSchemaDto),
        params: idSchema,
        response: {
          201: CommentSchemaDto,
        },
      },
      preHandler: [fastify.authenticate],
    },
    updateComment
  );

  fastify.delete(
    `${path}/:id`,
    {
      schema: {
        params: idSchema,
        response: {
          200: Type.Object(Type.String()),
        },
      },
      preHandler: [fastify.authenticate],
    },
    deleteComment
  );
}

export default commentRoute;
