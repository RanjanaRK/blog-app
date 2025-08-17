import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";

const editProfile: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  fastify.route({
    method: "PATCH",
    url: "/profile/edit",
    schema: {
      response: {
        "2xx": Type.Object({
          result: Type.Object({
            id: Type.String({ format: "uuid" }),
            first_name: Type.String(),
            last_name: Type.Optional(Type.String()),
            email: Type.String({ format: "email" }),
            bio: Type.String(),
          }),
        }),
      },
    },
    onRequest: fastify.authenticate, // This middleware ensures the user is authenticated

    handler: async (request, reply) => {
      try {
        const userId = (request.user as { id: string }).id;

        const { first_name, last_name, email, bio } = request.body as {
          first_name: string;
          last_name: string;
          email: string;
          bio: string;
        };

        const userUpdated = await fastify.prisma.user.update({
          where: { id: userId },
          data: {
            first_name,
            last_name,
            email,
            bio,
          },
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            bio: true,
            updatedAt: true,
          },
        });

        console.log(userUpdated);

        return reply.code(201).send({
          message: "Profile updated succussfully",
          result: userUpdated,
        });
      } catch (error) {}
    },
  });
};

export default editProfile;
