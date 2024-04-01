// Import the framework and instantiate it
import Fastify from "fastify";
import dotenv from "dotenv";

dotenv.config();

const { PORT } = process.env;

const fastify = Fastify({
  logger: true,
});

fastify.get("/", async function handler(request, reply) {
  return { hello: "world" };
});

try {
  fastify.listen({ port: Number(PORT) || 8000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
