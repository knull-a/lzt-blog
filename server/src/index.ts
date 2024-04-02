import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import dotenv from "dotenv";
import ms from "ms";
import articleRoute from "./routes/articleRoute";
import jwt from "@fastify/jwt";
import userRoute from "./routes/userRoute";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: any
  }
}

dotenv.config();

const { PORT } = process.env;

const fastify = Fastify({
  logger: true,
});

fastify.register(jwt, {
  secret: process.env.JWT_SECRET!,
  sign: {
    expiresIn: ms("15m"),
  },
});

fastify.register(articleRoute);
fastify.register(userRoute);

fastify.decorate(
  "authenticate",
  async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      await req.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  }
);

try {
  fastify.listen({ port: Number(PORT) || 8000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
