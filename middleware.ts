import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith("/blog")) {
      // Strip '/blog' from the path
      let ghostPath = pathname.replace(/^\/blog/, "") || "/";

      // Construct URL properly
      const url = new URL(ghostPath, "https://blog.pointblank.club");
      url.search = request.nextUrl.search;
      const ghostUrl = url.toString();

      // Fetch from Ghost
      const ghostResponse = await fetch(ghostUrl, {
        method: request.method,
        headers: {
          ...request.headers,
          host: "blog.pointblank.club", // Override host if needed
        },
        body: request.body,
        redirect: "manual",
      });

      // If error or redirect, return the original response to preserve behavior
      if (ghostResponse.status >= 300) {
        return new NextResponse(ghostResponse.body, {
          status: ghostResponse.status,
          headers: ghostResponse.headers,
        });
      }

      const contentType = ghostResponse.headers.get("content-type") || "";

      // For HTML, modify relative and absolute paths
      if (contentType.includes("text/html")) {
        const html = await ghostResponse.text();

        // Robust replacements for both relative and absolute URLs, single/double quotes
        let modifiedHtml = html
          .replace(/(href|src|srcset|action|content)=(["'])\/(?!blog\/)/g, '$1=$2/blog/')
          .replace(/(href|src|srcset|action|content)=(["'])https:\/\/blog\.pointblank\.club\//g, '$1=$2/blog/');

        return new NextResponse(modifiedHtml, {
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
  } catch (error) {
    // Catch and display errors for debugging
    console.error(error);
    return new NextResponse(`Middleware Error: ${(error as Error).message}`, { status: 500 });
  }
}

// Matcher to apply middleware only to /blog/*
export const config = {
  matcher: "/blog/:path*",
};
