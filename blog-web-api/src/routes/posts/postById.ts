import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { SinglePostSchema } from "../../utils/schema";

const postById: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  fastify.route({
    method: "GET",
    url: "/:postId",

    schema: SinglePostSchema,
    handler: async (request, reply) => {
      const { postId } = request.params as {
        postId: string;
      };

      try {
        const post = await fastify.prisma.post.findUnique({
          where: {
            id: postId,
          },

          include: {
            author: true,
            comments: true,
            categories: true,
            likes: true,
          },
        });

        if (!post) {
          return reply.code(404).send({
            error: "Not Found",
            message: `Post not found`,
          });
        }

        reply.send({ result: post });
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

export default postById;
