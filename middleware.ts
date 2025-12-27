import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/blog")) {
    // Strip '/blog' from the path
    const ghostPath = pathname.replace(/^\/blog/, "") || "/";
    const ghostUrl = `https://blog.pointblank.club${ghostPath}${request.nextUrl.search}`;

    // Fetch from Ghost
    const ghostResponse = await fetch(ghostUrl, {
      method: request.method,
      headers: {
        ...request.headers,
        host: "blog.pointblank.club", // Ensure Ghost sees the correct host
      },
      body: request.body,
      redirect: "manual",
    });

    // If error, fall back or 404
    if (ghostResponse.status >= 400) {
      return NextResponse.next();
    }

    const contentType = ghostResponse.headers.get("content-type") || "";

    // For HTML, modify relative paths to prefix with /blog
    if (contentType.includes("text/html")) {
      let html = await ghostResponse.text();

      // Replace relative root paths in common attributes
      html = html
        .replace(/href="\//g, 'href="/blog/')
        .replace(/src="\//g, 'src="/blog/')
        .replace(/srcset="\//g, 'srcset="/blog/')
        .replace(/action="\//g, 'action="/blog/')
        .replace(/content="\//g, 'content="/blog/'); // For meta/og tags if needed

      // Return modified HTML
      return new NextResponse(html, {
        status: ghostResponse.status,
        headers: ghostResponse.headers,
      });
    }

    // For non-HTML (CSS, JS, images, etc.), return as-is
    return new NextResponse(ghostResponse.body, {
      status: ghostResponse.status,
      headers: ghostResponse.headers,
    });
  }

  // Continue for other paths
  return NextResponse.next();
}

// Matcher to apply middleware only to /blog/*
export const config = {
  matcher: "/blog/:path*",
};
