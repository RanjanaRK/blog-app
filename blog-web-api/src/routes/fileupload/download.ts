import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";

const download: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  fastify.route({
    method: "GET",
    url: "/:fileId",

    schema: {
      params: Type.Object({
        fileId: Type.String(),
      }),
    },

    handler: async (request, reply) => {
      //   const { fileId } = request.params;
      //   return reply.download(fileId);
    },
  });
};

export default download;
