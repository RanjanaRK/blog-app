import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import bcrypt from "bcrypt";

const register: FastifyPluginAsyncTypebox = async (
  fastify,
  options
): Promise<void> => {
  const saltRounds = 10;

  fastify.route({
    method: "POST",
    url: "/register",
    schema: {
      body: Type.Object({
        first_name: Type.String({ minLength: 2 }),
        last_name: Type.String({ minLength: 2 }),
        email: Type.String({ format: "email" }),
        password: Type.String({ minLength: 6, maxLength: 30 }),
      }),
    },
    handler: async (request, reply) => {
      const { first_name, last_name, email, password, role, adminSecret } =
        request.body as {
          first_name: string;
          last_name: string;
          email: string;
          password: string;
          role?: any;
          adminSecret?: string;
        };

      const normalizedEmail = email.toLowerCase().trim();

      try {
        // Check if user already exists
        const existingUser = await fastify.prisma.user.findUnique({
          where: {
            email: normalizedEmail,
          },
          select: {
            id: true,
          },
        });

        if (existingUser) {
          return reply.conflict("Email already exists");
        }

        // If the user is trying to register as an admin,
        // verify that the admin secret matches the one stored in your environment
        if (role === "ADMIN") {
          if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
            return reply.code(401).send({
              success: false,
              message: "Invalid admin secret.",
            });
          }
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create the new user
        const newUser = await fastify.prisma.user.create({
          data: {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword,
            role: role ? role : "USER",
          },
        });

        return reply.code(201).send({
          message:
            "Thankyou for registering with us. Your account has been registered successfully created",
          user: {
            id: newUser.id,
            first_name: newUser.first_name,
            email: newUser.email,
            role: newUser.role,
          },
        });
      } catch (error: any) {
        // Log the error (for debugging)
        fastify.log.error(error);

        // General server error response
        return reply.code(500).send({
          error: "Internal Server Error",
          message: "Something went wrong",
        });
      }
    },
  });
};

export default register;
