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

  // fastify.decorate(
  //   "authenticate",
  //   async (request: FastifyRequest, reply: FastifyReply) => {
  //     const { authCookie } = request.cookies;

  //     try {
  //       if (authCookie === undefined) {
  //         await request.jwtVerify();
  //       } else {
  //         const decoded = fastify.jwt.verify(authCookie);
  //         request.user = decoded as { id: string; role: string };
  //       }
  //     } catch (error) {
  //       reply.unauthorized("Unauthorized");
  //     }
  //   }
  // );

  // fastify.decorate(
  //   "authenticate",
  //   async (request: FastifyRequest, reply: FastifyReply) => {
  //     const { authCookie } = request.cookies;

  //     try {
  //       if (!authCookie) {
  //         // This will look for the token in the Authorization header.
  //         await request.jwtVerify();
  //       } else {
  //         // Verify token from the cookie and attach decoded payload to request.user.
  //         const decoded = await fastify.jwt.verify(authCookie);
  //         request.user = decoded as { id: string; role: string };
  //       }
  //     } catch (error) {
  //       reply.unauthorized("Unauthorized");
  //     }
  //   }
  // );

  // fastify.decorate(
  //   "requireAdmin",
  //   async (request: FastifyRequest, reply: FastifyReply) => {
  //     // First, run the authentication.
  //     await fastify.authenticate(request, reply);

  //     // Check if user role is ADMIN.
  //     if (!request.user || request.user.role !== "ADMIN") {
  //       return reply.status(403).send({ error: "Access denied. Admins only." });
  //     }
  //   }
  // );

  fastify.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      //   try {
      //     // Check both header and cookie, if needed.
      //     const tokenFromHeader = request.headers.authorization?.split(" ")[1];
      //     const tokenFromCookie = request.cookies.authCookie;
      //     const token = tokenFromHeader || tokenFromCookie;

      //     fastify.log.info("Token received: " + token);

      //     if (!token) {
      //       throw new Error("No token provided");
      //     }

      //     await request.jwtVerify(); // Ensure jwtVerify is using the same secret and options as during signing
      //   } catch (err) {
      //     fastify.log.error(err);
      //     reply.code(401).send({ message: "Unauthorized" });
      //   }
      // }

      const { authCookie } = request.cookies;

      // fastify.log.info("Request headers:", request.headers);
      // fastify.log.info("Request cookies:", request.cookies);

      try {
        if (authCookie === undefined) {
          await request.jwtVerify();
        } else {
          // fastify.jwt.verify(authCookie);
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
