import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { IdSchemaType } from "../models/idSchema";
import {
  ArticleSchemaDtoType,
  ArticleSchemaType,
} from "../models/articleSchema";
import { PaginationSchemaType } from "../models/paginationSchema";

const prisma = new PrismaClient();

async function getArticles(
  req: FastifyRequest<{ Querystring: PaginationSchemaType }>,
  reply: FastifyReply
) {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const articles = await prisma.article.findMany({
    skip,
    take: limit,
    include: { author: true, comments: true },
  });

  reply.code(200).send(articles);
}

async function getArticleById(
  req: FastifyRequest<{ Params: IdSchemaType }>,
  reply: FastifyReply
) {
  const { id } = req.params;

  const article = await prisma.article.findUnique({
    where: { id },
    include: { author: true, comments: true },
  });

  if (!article) {
    reply.code(404).send({ message: "Article not found" });
    return;
  }

  reply.code(200).send(article);
}

async function createArticle(
  req: FastifyRequest<{ Body: ArticleSchemaDtoType; Reply: ArticleSchemaType }>,
  reply: FastifyReply
) {
  const { title, text } = req.body;
  const authorId = req.user.id;

  const article = await prisma.article.create({
    data: { title, text, authorId },
  });

  reply.code(201).send(article);
}

async function updateArticle(
  req: FastifyRequest<{
    Params: IdSchemaType;
    Body: Partial<ArticleSchemaType>;
  }>,
  reply: FastifyReply
) {
  const { id } = req.params;
  const { title, text } = req.body;

  const article = await prisma.article.update({
    where: { id: Number(id) },
    data: { title, text },
  });

  reply.code(200).send(article);
}

async function deleteArticle(
  req: FastifyRequest<{ Params: IdSchemaType }>,
  reply: FastifyReply
) {
  const { id } = req.params;
  await prisma.article.delete({ where: { id } });

  reply.code(200).send("Success");
}

export {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
