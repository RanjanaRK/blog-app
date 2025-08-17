import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const deleteComments: FastifyPluginAsyncTypebox = async (
  fastify,
  options
): Promise<void> => {
  fastify.route({
    method: "DELETE",
    url: "/delete/:id",
    schema: {},
    onRequest: fastify.authenticate,
    handler: async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        const userId = (request.user as { id: string }).id;

        const existing = await fastify.prisma.comment.findUnique({
          where: { id },
          select: { authorId: true },
        });
        if (!existing) {
          return reply.code(404).send({ error: "Comment not found" });
        }
        if (existing.authorId !== userId) {
          return reply.code(403).send({ error: "Forbidden" });
        }

        // delete
        await fastify.prisma.comment.delete({ where: { id } });

        fastify.log.info("Prisma found comment:", existing);

        return reply
          .code(200)
          .send({ message: "comment deleted successfully" });
      } catch (error: any) {
        fastify.log.error(error);
        return reply.code(500).send({ error: error.message });
      }
    },
  });
};

export default deleteComments;
