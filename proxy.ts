import { withAuth } from "next-auth/middleware";

export const proxy = withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  // Only protect the dashboard and its sub-pages
  matcher: ["/admin/dashboard/:path*"],
};
