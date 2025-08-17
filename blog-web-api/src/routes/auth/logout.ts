import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const logout: FastifyPluginAsyncTypebox = async (
  fastify,
  options
): Promise<void> => {
  fastify.route({
    method: "POST",
    url: "/logout",
    schema: {},
    handler: async (request, reply) => {
      // Retrieve the token from the request's cookies
      const { authCookie } = request.cookies;
      console.log(authCookie);

      try {
        // if (token === undefined) {
        //   const { id } = await request.jwtVerify<{ id: string }>();

        //   await fastify.prisma.user.update({
        //     where: {
        //       id: id,
        //     },
        //     data: {
        //       token: null,
        //     },
        //   });
        //   return reply.code(200).send({ message: "Logout " });
        // }

        // if (token === "") {
        //   return reply.code(200).send({ message: "Logout " });
        // }

        // // Invalidate the token in the database
        // if (token !== undefined && token !== "") {
        //   const { id } = await request.jwtVerify<{ id: string }>();

        //   await fastify.prisma.user.update({
        //     where: {
        //       id: id,
        //     },
        //     data: {
        //       token: null,
        //     },
        //   });

        //   // Clear the authentication cookie
        //   reply.clearCookie("authCookie", {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "strict",
        //   });
        //   return reply.code(200).send({ message: "Logout successful" });
        // }

        if (authCookie === undefined) {
          // Verify the JWT from Authorization header and extract user ID
          const { id } = await request.jwtVerify<{ id: string }>();

          // Clear user's token in database
          await fastify.prisma.user.update({
            where: {
              id: id,
            },
            data: {
              token: null, // Invalidate the token in database
            },
          });

          return reply.code(200).send({
            message: "Logout successful",
          });
        }

        // Case 2: Empty cookie - user is already logged out
        if (authCookie === "") {
          return reply.code(200).send({
            message: "Already Logged Out",
          });
        }

        // Case 3: Valid cookie token present
        if (authCookie !== undefined && authCookie !== "") {
          // Verify the token from cookie and extract user ID
          const { id } = fastify.jwt.verify<{ id: string }>(authCookie);

          // Clear user's token in database
          await fastify.prisma.user.update({
            where: {
              id: id,
            },
            data: {
              token: null, // Invalidate the token in database
            },
          });

          // Remove the authentication cookie from client
          reply.clearCookie("authCookie", {
            path: "/", // Cookie is valid for all paths
          });

          return reply.code(200).send({
            message: "Logout successful",
          });
        }
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

export default logout;
