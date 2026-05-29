import { NextResponse, type NextRequest } from "next/server";

function reviewRoutesEnabled() {
  return (
    process.env.ENABLE_REVIEW_ROUTES === "true" ||
    process.env.NEXT_PUBLIC_ENABLE_REVIEW_ROUTES === "true"
  );
}

export function proxy(request: NextRequest) {
  if (reviewRoutesEnabled()) {
    return NextResponse.next();
  }

  return new NextResponse(null, {
    status: 404,
    headers: {
      "x-robots-tag": "noindex, nofollow",
      "x-blocked-route": request.nextUrl.pathname,
    },
  });
}

export const config = {
  matcher: ["/client/:path*", "/hero-pick", "/hero-pick/:path*"],
};
