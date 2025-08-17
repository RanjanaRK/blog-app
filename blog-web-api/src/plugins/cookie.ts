import fastifyCookie, { FastifyCookieOptions } from "@fastify/cookie";
import fp from "fastify-plugin";
import env from "../utils/env";

export default fp<FastifyCookieOptions>(async (fastify) => {
  fastify.register(fastifyCookie, {
    secret: env.SECRET_KEY, // Optional for signed cookies
    parseOptions: {
      // httpOnly: true,
      // sameSite: "lax",
      // secure: "auto",
      // path: "/",
      // signed: true,
      httpOnly: true,
      sameSite: "lax",
      secure: "auto",
      path: "/",
    },
  });
});
