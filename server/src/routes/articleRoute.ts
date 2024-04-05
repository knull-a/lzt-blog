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
import { paginationSchema } from "../models/paginationSchema";

async function articleRoute(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  path: string
) {
  fastify.get(
    path,
    {
      schema: {
        response: {
          200: ArticleSchemaList,
        },
        querystring: paginationSchema
      }
    },
    getArticles
  );

  fastify.get(
    `${path}/:id`,
    {
      schema: {
        response: {
          200: ArticleSchema,
        },
        params: idSchema,
      }
    },
    getArticleById
  );

  fastify.post(
    path,
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
    `${path}/:id`,
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
