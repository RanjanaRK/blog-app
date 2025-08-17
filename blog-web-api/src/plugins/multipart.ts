import fastifyMultipart, { FastifyMultipartOptions } from "@fastify/multipart";
import fp from "fastify-plugin";

export default fp<FastifyMultipartOptions>(async (fastify) => {
  fastify.register(fastifyMultipart);
});
