import {  PrismaClient } from "@prisma/client";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserSchemaType, UserSchemaTypeDto } from "../models/userSchema";
import { hashPassword } from "../utils/hashPassword";
import { comparePassword } from "../utils/comparePassword";
import ms from "ms";
import { generateSalt } from "../utils/generateSalt";

const prisma = new PrismaClient();

async function registerUser(
  req: FastifyRequest<{ Body: UserSchemaTypeDto }>,
  reply: FastifyReply,
  fastify: FastifyInstance
) {
  const generatedSalt = generateSalt();
  const { email, password, name, role } = req.body;
  const { hash: hashedPassword } = await hashPassword(password, generatedSalt);

  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name, role, salt: generatedSalt },
  });

  const accessToken = fastify.jwt.sign({ id: user.id, email: user.email });
  const refreshToken = fastify.jwt.sign(
    { id: user.id },
    { expiresIn: ms("7d") }
  );

  reply.code(201).send({ accessToken, refreshToken });
}

async function loginUser(
  req: FastifyRequest<{ Body: UserSchemaType }>,
  reply: FastifyReply,
  fastify: FastifyInstance
) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (
    !user ||
    !(await comparePassword(password, user.password, String(user.salt)))
  ) {
    reply.code(401).send({ message: "Invalid credentials" });
    return;
  }

  const accessToken = fastify.jwt.sign({ id: user.id, email: user.email });
  const refreshToken = fastify.jwt.sign(
    { id: user.id },
    { expiresIn: ms("7d") }
  );

  reply.code(201).send({ accessToken, refreshToken });
}

async function refreshToken(
  req: FastifyRequest<{ Body: { refreshToken: string } }>,
  reply: FastifyReply,
  fastify: FastifyInstance
) {
  const { refreshToken } = req.body;

  try {
    const decoded = fastify.jwt.decode<UserSchemaType>(refreshToken);
    if (!decoded) {
      return reply.code(400).send({ message: "Cannot decode refresh token" });
    }
    const accessToken = fastify.jwt.sign({
      email: decoded.email,
    });
    reply.send({ accessToken });
  } catch (err) {
    reply.code(401).send({ message: "Invalid refresh token" });
  }
}

async function getUserProfile(req: FastifyRequest, reply: FastifyReply) {
  const { user } = req;

  reply.code(200).send(user);
}

async function updateUserProfile(
  req: FastifyRequest<{ Body: Partial<UserSchemaType> }>,
  reply: FastifyReply,
  fastify: FastifyInstance
) {
  if (req.body.password) {
    req.body.password = (await hashPassword(req.body.password)).hash;
  }

  const updatedUser = await prisma.user.update({
    where: { id: (req.user as any).id },
    data: req.body,
  });

  const accessToken = fastify.jwt.sign({
    id: updatedUser.id,
    email: updatedUser.email,
  });
  const refreshToken = fastify.jwt.sign(
    { id: updatedUser.id },
    { expiresIn: ms("7d") }
  );

  reply.code(200).send({ ...updatedUser, accessToken, refreshToken });
}
export {
  registerUser,
  loginUser,
  refreshToken,
  getUserProfile,
  updateUserProfile,
};
