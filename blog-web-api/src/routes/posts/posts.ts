import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { getAllPostSchema } from "../../utils/schema";

const posts: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  //  retrieve all post
  fastify.route({
    method: "GET",
    url: "/",

    schema: getAllPostSchema,
    handler: async (request, reply) => {
      try {
        const usersWithPosts = await fastify.prisma.post.findMany({
          include: {
            author: true, // Include author details
            comments: true,
            categories: true, // Include categories
            likes: true,
          },
        });

        reply.send({ result: usersWithPosts });
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

export default posts;
