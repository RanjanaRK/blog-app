import fastifyStatic from "@fastify/static";
import fp from "fastify-plugin";
import path from "path";

export default fp(async (fastify) => {
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, "..", "..", "uploads"),
    prefix: "/uploads/",
  });
});
