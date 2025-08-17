import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";

const createCategory: FastifyPluginAsyncTypebox = async (
  fastify,
  options
): Promise<void> => {
  fastify.route({
    method: "POST",
    url: "/create",
    schema: {
      body: Type.Object({
        name: Type.String(),
      }),
    },
    onRequest: fastify.requireAdmin,
    handler: async (request, reply) => {
      const { name } = request.body as { name: string };

      try {
        const addCat = await fastify.prisma.category.create({
          data: { name },
        });

        return reply.code(201).send({
          message: "Add category successfully",
          addCat,
        });
      } catch (error: any) {
        fastify.log.error(error);
        return reply
          .code(500)
          .send({ message: "Internal Server Error", error: error.message });
      }
    },
  });
};
export default createCategory;
