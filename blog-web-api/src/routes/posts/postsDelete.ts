import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const postsDelete: FastifyPluginAsyncTypebox = async (
  fastify,
  options
): Promise<void> => {
  fastify.route({
    method: "DELETE",
    url: "/delete/:id",
    schema: {},
    onRequest: fastify.requireAdmin,
    handler: async (request, reply) => {
      const { id } = request.params as { id: string };
      try {
        const existingPost = await fastify.prisma.post.findUnique({
          where: { id },
        });
        if (!existingPost) {
          return reply.code(404).send({ message: "Post not found" });
        }

        const abc = (request.user as { id: string }).id;

        console.log(abc);
        console.log(existingPost.authorId);

        if ((request.user as { id: string }).id !== existingPost.authorId) {
          return reply.code(403).send({ message: "Access denied" });
        }

        // Delete the post from the database.
        const deletePost = await fastify.prisma.post.delete({
          where: {
            id: id,
          },
        });
        console.log(deletePost);

        // return deleteUser;
        return reply.code(200).send({ message: "Post deleted successfully" });
      } catch (error: any) {
        fastify.log.error(error);
        return reply.code(500).send({ error: error.message });
      }
    },
  });
};

export default postsDelete;
