import fastifyJwt, { FastifyJWTOptions } from "@fastify/jwt";
import { FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import env from "../utils/env";

export default fp<FastifyJWTOptions>(async (fastify) => {
  // Register the fastify-jwt plugin
  fastify.register(fastifyJwt, {
    secret: env.SECRET_KEY, // Secret key for JWT signing
    decode: {
      complete: true,
    },
    sign: {
      iss: "fstAuth",
    },
    verify: {
      allowedIss: "fstAuth",
    },
    cookie: {
      cookieName: "authCookie", // Name of the cookie containing the token
      signed: true, // If cookies are signed
    },
  });

  fastify.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { authCookie } = request.cookies;

      try {
        if (authCookie === undefined) {
          await request.jwtVerify();
        } else {
          const decoded = fastify.jwt.verify(authCookie);
          request.user = decoded as { id: string; role: string };
        }
      } catch (error) {
        reply.unauthorized("Unauthorized");
      }
    }
  );

  fastify.decorate(
    "requireAdmin",
    async (request: FastifyRequest, reply: FastifyReply) => {
      // Authenticate first
      await fastify.authenticate(request, reply);

      // Convert request.user to our expected type.
      const user = request.user as { id: string; role: string } | undefined;

      console.log(user);

      if (!user || user.role.toUpperCase() !== "ADMIN") {
        return reply
          .status(403)
          .send({ error: "Access denied. Admins only.", user: user?.role });
      }
    }
  );
});
