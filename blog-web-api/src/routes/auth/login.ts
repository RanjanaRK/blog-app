import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import bcrypt from "bcrypt";

const login: FastifyPluginAsyncTypebox = async (
  fastify,
  options
): Promise<void> => {
  fastify.route({
    method: "POST",
    url: "/login",
    schema: {
      body: Type.Object({
        email: Type.String({ format: "email" }),
        password: Type.String({ minLength: 6, maxLength: 30 }),
      }),
    },
    handler: async (request, reply) => {
      const { email, password } = request.body as {
        email: string;
        password: string;
      };

      const normalizedEmail = email.toLowerCase().trim();

      try {
        // Check the existing email
        const userExists = await fastify.prisma.user.findUnique({
          where: {
            email: normalizedEmail,
          },
          select: {
            id: true,
            email: true,
            password: true,
            token: true,
            role: true,
            first_name: true,
          },
        });

        if (!userExists) {
          reply.notFound("User not found");
        }
        // Validate password
        const isPassowrdValid =
          userExists && (await bcrypt.compare(password, userExists.password));

        if (!isPassowrdValid) {
          return reply.unauthorized("Invalid password");
        }

        // Check the existing token
        if (userExists.token !== null && userExists.token !== "") {
          return reply
            .setCookie("authCookie", userExists.token)
            .code(201)
            .send({
              message: "User login successful",
              token: userExists.token,
              user: userExists,
            });
        }

        // Check if the token is missing
        if (userExists.token === "" || userExists.token === null) {
          // Generate a new access token
          const accessToken = await fastify.jwt.sign({
            id: userExists.id,
            role: userExists.role,
          });

          // console.log("Generated Token:", accessToken);
          // console.log(accessToken);

          // Save the token in the database
          const abc = await fastify.prisma.user.update({
            where: {
              id: userExists.id,
            },
            data: {
              token: accessToken, // Set the new token
            },
          });

          if (!accessToken) {
            throw new Error("Token is null before saving to the database");
          }
          console.log(abc);

          return reply
            .setCookie("authCookie", accessToken)
            .code(201)
            .send({
              message: "You have successfully logged in",
              token: userExists.token || accessToken,
              user: userExists,
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

export default login;
