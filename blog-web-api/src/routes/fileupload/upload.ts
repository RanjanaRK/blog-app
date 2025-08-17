import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { extension } from "mime-types";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { v4 } from "uuid";

const upload: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  fastify.route({
    method: "POST",
    url: "/upload",
    schema: {},
    handler: async (request, reply) => {
      // Check if the request is multipart
      if (!request.isMultipart()) {
        return reply
          .code(415)
          .send({ message: "Content-Type must be multipart/form-data" });
      }

      const fileData = await request.file();

      if (fileData === undefined) {
        return reply.badRequest("No file uploaded");
      }

      try {
        const fileId = v4();
        const fileExt = extension(fileData.mimetype);

        if (!fileExt) {
          return reply.code(400).send({ message: "Unsupported file type" });
        }

        const sanitizedFileName = `${fileId}.${fileExt}`;

        await pipeline(
          fileData.file,
          createWriteStream(`./uploads/${sanitizedFileName}`)
        );

        const cbbc = await fastify.prisma.fileAsset.create({
          data: {
            id: fileId,
            fileName: sanitizedFileName,
          },
        });

        console.log(request.headers["content-type"]);

        return reply.code(201).send({ message: "uploadedddd", cbbc });
      } catch (error: any) {
        fastify.log.error(error);
        return reply
          .code(500)
          .send({ message: "File upload failed", error: error.message });
      }
    },
  });
};

export default upload;
