import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { ArticleSchema, ArticleSchemaList } from "../models/articleSchema";
import { idSchema } from "../models/idSchema";
import {
  createArticle,
  getArticleById,
  getArticles,
  updateArticle,
} from "../controllers/articleController";

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
    },
    getArticleById
  );

  fastify.post(
    "/articles/:id",
    {
      schema: {
        body: ArticleSchema,
        params: idSchema,
        response: {
          201: ArticleSchema,
        },
      },
    },
    createArticle
  );

  fastify.patch(
    "/articles/:id",
    {
      schema: {
        body: ArticleSchema,
        params: idSchema,
        response: {
          201: ArticleSchema,
        },
      },
    },
    updateArticle
  );
}

export default articleRoute;
