import fastifyEtag from "@fastify/etag";
import fp from "fastify-plugin";

export default fp(async (fastify) => {
  fastify.register(fastifyEtag);
});
