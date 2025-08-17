import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { CategoriesResponseSchema } from "../../utils/schema";

const getCategory: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  fastify.route({
    method: "GET",

    url: "/",

    schema: {
      response: {
        200: CategoriesResponseSchema,
      },
    },

    handler: async (request, reply) => {
      try {
        const category = await fastify.prisma.category.findMany();

        reply.send({ result: category });
      } catch (error) {
        // Log the error (for debugging)
        fastify.log.error(error);

        // General server error response
        return reply.code(500).send({
          error: "Internal Server Error",
          message: error,
        });
      }
    },
  });
};

export default getCategory;
