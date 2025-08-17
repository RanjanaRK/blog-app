import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { CommentsResponseSchema } from "../../utils/schema";
// import { CategoriesResponseSchema } from "../../utils/schema";

const getComments: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  fastify.route({
    method: "GET",
    url: "/:postId",
    schema: {
      response: {
        200: CommentsResponseSchema,
      },
    },

    handler: async (request, reply) => {
      try {
        const { postId } = request.params as { postId: string };

        const comments = await fastify.prisma.comment.findMany({
          where: { postId },
          // orderBy: { createdAt: "asc" },
          include: {
            author: {
              select: { first_name: true, last_name: true },
            },
          },
        });

        return reply.code(200).send({ result: comments });
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

export default getComments;
