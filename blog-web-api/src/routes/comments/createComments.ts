import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const createComments: FastifyPluginAsyncTypebox = async (
  fastify,
  options
): Promise<void> => {
  fastify.route({
    method: "POST",
    url: "/create",
    schema: {
      body: {
        type: "object",
        required: ["content", "authorId"],
        properties: {
          content: { type: "string", minLength: 1 },
          authorId: { type: "string", format: "uuid" },
          postId: { type: "string", format: "uuid" },
        },
        additionalProperties: false,
      },
      response: {
        201: {
          type: "object",
          properties: {
            id: { type: "string" },
            content: { type: "string" },
            postId: { type: "string" },
            authorId: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        400: {
          type: "object",
          properties: { error: { type: "string" } },
        },
        500: {
          type: "object",
          properties: { error: { type: "string" } },
        },
      },
    },

    onRequest: fastify.authenticate,

    handler: async (request, reply) => {
      const { content, authorId, postId } = request.body as {
        content: string;
        authorId: string;
        postId: string;
      };

      try {
        // pseudo-code
        // const token = request.cookies.token;
        // const userId = verifyJwt(token).userId;

        const existingPost = await fastify.prisma.post.findUnique({
          where: { id: postId },
        });

        if (!existingPost) {
          return reply
            .code(400)
            .send({ error: "Invalid postId: post not found" });
        }

        const existingAuthor = await fastify.prisma.user.findUnique({
          where: { id: authorId },
        });

        if (!existingAuthor) {
          return reply
            .code(400)
            .send({ error: "Invalid authorId: user not found" });
        }

        const addComments = await fastify.prisma.comment.create({
          data: {
            content,
            author: { connect: { id: authorId } },
            post: { connect: { id: postId } },
          },
        });

        return reply.code(201).send({
          message: "send comments successfully",
          addComments,
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
export default createComments;
