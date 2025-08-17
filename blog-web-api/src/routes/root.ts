import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.route({
    method: "GET",

    url: "/",

    // schema: {},

    handler: async (request, reply) => {
      reply.send({ root: true });
    },
  });
};

export default root;
