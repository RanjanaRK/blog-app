import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { getAllUsersSchema } from "../../utils/schema";

const users: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  //  retrieve all users
  fastify.route({
    method: "GET",
    url: "/",
    schema: getAllUsersSchema,
    // onRequest: fastify.requireAdmin,
    handler: async (request, reply) => {
      try {
        const alluser = await fastify.prisma.user.findMany();

        return reply.code(201).send({ result: alluser });
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

export default users;
