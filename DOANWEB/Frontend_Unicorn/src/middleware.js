import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import USER_ROLES from "./configs/config.users.roles";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;
    if (pathname.startsWith("/admin")) {
      if (token && token.role === USER_ROLES.ADMIN) {
        return NextResponse.next();
      } else {
        return Response.json(
          {
            statusCode: 401,
            status: "Unauthorized",
            message: "Không đủ quyền hạn",
          },
          { status: 401 }
        );
        return NextResponse.redirect("/");
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (token) {
          return true;
        }
      },
    },
    pages: {
      signIn: "/sign-in",
      error: "/error",
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/profile/:path*",
    "/cart/:path*",
    "/orders/:path*",
    "/products/favorite/:path*",
    "/products/:path/reviews",
  ],
};
