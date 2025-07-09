import { type NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const { url, cookies } = request;

  const session = cookies.get("session")?.value;

  const isAuthPage = url.includes("/auth");
  const isDashboardPage = url.includes("/dashboard");
  const isUserPostsPage = url.includes("/my-posts");

  const isCreatePostPage = url.includes("/create-post");

  if (isAuthPage) {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard/settings", url));
    }

    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/auth/sign-in", url));
  }

  if (isUserPostsPage || isCreatePostPage || isDashboardPage) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth/sign-in", url));
    }
  }
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*", "/create-post", "/my-posts"],
};
