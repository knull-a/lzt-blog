import Fastify from "fastify";
import dotenv from "dotenv";
import articleRoute from "./routes/articleRoute";


dotenv.config();

const { PORT } = process.env;

const fastify = Fastify({
  logger: true,
});

fastify.register(articleRoute);

try {
  fastify.listen({ port: Number(PORT) || 8000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
