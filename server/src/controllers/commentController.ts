import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { CommentSchemaDtoType } from "../models/commentSchema";
import { IdSchemaType } from "../models/idSchema";

const prisma = new PrismaClient();

async function getComments(req: FastifyRequest, rep: FastifyReply) {
  const comments = await prisma.comment.findMany({
    include: { author: true, article: true },
  });

  rep.code(200).send(comments);
}

async function createComment(
  req: FastifyRequest<{
    Body: CommentSchemaDtoType;
  }>,
  rep: FastifyReply
) {
  const { text, articleId } = req.body;

  const comment = await prisma.comment.create({
    data: { text, articleId, authorId: req.user.id },
  });

  rep.code(201).send(comment);
}

async function updateComment(
  req: FastifyRequest<{
    Params: IdSchemaType;
    Body: { text: string };
  }>,
  rep: FastifyReply
) {
  const { id } = req.params;
  const { text } = req.body;

  const comment = await prisma.comment.update({
    where: { id },
    data: { text },
  });

  rep.code(200).send(comment);
}

async function deleteComment(
  req: FastifyRequest<{ Params: IdSchemaType }>,
  rep: FastifyReply
) {
  const { id } = req.params;

  await prisma.comment.delete({
    where: { id },
  });

  rep.code(200).send({ message: "Comment deleted successfully" });
}

export { getComments, createComment, updateComment, deleteComment };
