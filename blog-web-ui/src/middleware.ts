import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import env from "./lib/env";

export const middleware = async (request: NextRequest) => {
  const cookiesToken = request.cookies.get("authCookie")?.value;

  const secret = new TextEncoder().encode(env.JWT_SECRET);

  if (cookiesToken === undefined || cookiesToken === "") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    await jwtVerify(cookiesToken, secret);

    return NextResponse.next();
  } catch (error) {
    console.log(error);

    const customResponse = NextResponse.redirect(
      new URL("/auth/login", request.url)
    );

    customResponse.cookies.delete("authCookie");

    return customResponse;
  }
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/create-blog", "/admin/category", "/profile"],
};
