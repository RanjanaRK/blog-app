import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { extension } from "mime-types";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { v4 } from "uuid";

const postsCreate: FastifyPluginAsyncTypebox = async (
  fastify,
  options
): Promise<void> => {
  fastify.route({
    method: "POST",
    url: "/create",
    schema: {},
    onRequest: fastify.requireAdmin,
    handler: async (request, reply) => {
      try {
        if (!request.isMultipart()) {
          return reply
            .code(415)
            .send({ message: "Content-Type must be multipart/form-data" });
        }

        const formData: { [key: string]: any } = {};
        let coverImagePath: string | null = null;

        const parts = request.parts();
        const fileId = v4();
        for await (const part of parts) {
          if (part.type === "file") {
            // Handle file upload
            const fileExt = extension(part.mimetype);
            const sanitizedFileName = `${fileId}.${fileExt}`;
            await pipeline(
              part.file,
              createWriteStream(`./uploads/${sanitizedFileName}`)
            );
            coverImagePath = `/uploads/${sanitizedFileName}`;
          } else {
            // Map form fields dynamically
            formData[part.fieldname] = part.value;
          }
        }

        // Validate required fields
        const { title, content, authorId, categories } = formData;
        if (!title || !content || !authorId) {
          return reply
            .code(400)
            .send({ message: "Title, content, and authorId are required." });
        }

        const parsed = categories ? JSON.parse(categories) : [];
        const categoryId = Array.isArray(parsed) ? parsed[0] : parsed;
        // const categoryIds = categories ? JSON.parse(categories) : undefined;

        // Save the post in the database
        const post = await fastify.prisma.post.create({
          data: {
            title,
            content,
            coverImage: coverImagePath,
            author: { connect: { id: authorId } },
            categories: {
              connect: { id: categoryId },
            },
          },
        });

        return reply
          .code(201)
          .send({ message: "Post created successfully!", post });
      } catch (error: any) {
        fastify.log.error(error);
        return reply
          .code(500)
          .send({ message: "Internal Server Error", error: error.message });
      }
    },
  });
};
export default postsCreate;
