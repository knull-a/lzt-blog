import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import dotenv from "dotenv";
import ms from "ms";
import articleRoute from "./routes/articleRoute";
import jwt from "@fastify/jwt";
import userRoute from "./routes/userRoute";
import commentRoute from "./routes/commentRoute";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: any;
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

fastify.register((fastify, options) =>
  articleRoute(fastify, options, "/articles")
);
fastify.register((fastify, options) => userRoute(fastify, options, "/users"));
fastify.register((fastify, options) =>
  commentRoute(fastify, options, "/comments")
);

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
