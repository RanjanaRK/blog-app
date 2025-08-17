import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const deleteCategory: FastifyPluginAsyncTypebox = async (
  fastify,
  options
): Promise<void> => {
  fastify.route({
    method: "DELETE",
    url: "/delete/:id",
    schema: {},
    onRequest: [fastify.requireAdmin],
    handler: async (request, reply) => {
      try {
        const { id } = request.params as { id: string };

        await fastify.prisma.category.delete({ where: { id } });

        return reply
          .code(200)
          .send({ message: "Category deleted successfully" });
      } catch (error: any) {
        fastify.log.error(error);
        return reply.code(500).send({ error: error.message });
      }
    },
  });
};

export default deleteCategory;
