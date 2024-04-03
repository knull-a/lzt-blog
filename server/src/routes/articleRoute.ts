import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { ArticleSchema, ArticleSchemaDto, ArticleSchemaList } from "../models/articleSchema";
import { idSchema } from "../models/idSchema";
import {
  createArticle,
  getArticleById,
  getArticles,
  updateArticle,
} from "../controllers/articleController";
import { Type } from "@sinclair/typebox";

async function articleRoute(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get(
    "/articles",
    {
      schema: {
        response: {
          200: ArticleSchemaList,
        },
      },
      preHandler: [fastify.authenticate],
    },
    getArticles
  );

  fastify.get(
    "/articles/:id",
    {
      schema: {
        response: {
          200: ArticleSchema,
        },
        params: idSchema,
      },
      preHandler: [fastify.authenticate],
    },
    getArticleById
  );

  fastify.post(
    "/articles",
    {
      schema: {
        body: ArticleSchemaDto,
        response: {
          201: ArticleSchemaDto,
        },
      },
      preHandler: [fastify.authenticate],
    },
    createArticle
  );

  fastify.patch(
    "/articles/:id",
    {
      schema: {
        body: Type.Partial(ArticleSchemaDto),
        params: idSchema,
        response: {
          201: ArticleSchemaDto,
        },
      },
      preHandler: [fastify.authenticate],
    },
    updateArticle
  );
}

export default articleRoute;
