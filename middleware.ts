import { NextRequest, NextResponse } from "next/server";

const GHOST_ORIGIN = "https://blog.pointblank.club";

export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith("/blog")) {
      // Compute the path to request from Ghost (strip /blog, default to /)
      const ghostPath = pathname.slice(6) || "/";

      // Build full Ghost URL with preserved query params
      const ghostUrl = new URL(ghostPath + request.nextUrl.search, GHOST_ORIGIN).toString();

      // Fetch from Ghost, preserving method/headers/body
      const ghostResponse = await fetch(ghostUrl, {
        method: request.method,
        headers: {
          ...Object.fromEntries(request.headers.entries()),
          host: new URL(GHOST_ORIGIN).host, // Ensure correct host header
        },
        body: request.method === "GET" || request.method === "HEAD" ? null : request.body,
        redirect: "manual", // Capture redirects if any
      });

      // Clone headers for modification
      const responseHeaders = new Headers(ghostResponse.headers);

      // Handle redirects from Ghost (e.g., if Ghost 301s /about-us somewhere)
      if (ghostResponse.status >= 300 && ghostResponse.status < 400) {
        const location = responseHeaders.get("location");
        if (location) {
          const newLocation = location.replace(GHOST_ORIGIN, "/blog");
          responseHeaders.set("location", newLocation);
        }
        return new NextResponse(null, {
          status: ghostResponse.status,
          headers: responseHeaders,
        });
      }

      const contentType = responseHeaders.get("content-type") || "";

      if (contentType.includes("text/html")) {
        let html = await ghostResponse.text();

        // More comprehensive replacements using regex
        // Handles href, src, srcset, action, content, data-src, etc.
        // For both quoted ("/path or ' /path) and covers root-relative
        html = html.replace(
          /(href|src|srcset|action|content|data-src|data-srcset)=(["'])(\/(?!blog\/)|https:\/\/blog\.pointblank\.club(\/)?)/g,
          `$1=$2/blog/`
        );

        // Also handle unquoted (rare, but possible in srcset)
        html = html.replace(
          /(href|src|srcset|action|content|data-src|data-srcset)=\/(?!blog\/)/g,
          `$1=/blog/`
        );

        // Optional: Replace canonical and og:url if present
        html = html.replace(
          /(<meta property="og:url" content=")https:\/\/blog\.pointblank\.club\//g,
          "$1https://btabc.vercel.app/blog/"
        );
        html = html.replace(
          /(<link rel="canonical" href=")https:\/\/blog\.pointblank\.club\//g,
          "$1https://btabc.vercel.app/blog/"
        );

        return new NextResponse(html, {
          status: ghostResponse.status,
          headers: responseHeaders,
        });
      }

      // For non-HTML (assets, JSON, etc.) pass through directly
      return new NextResponse(ghostResponse.body, {
        status: ghostResponse.status,
        headers: responseHeaders,
      });
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return new NextResponse(`Internal Server Error: ${(error as Error).message}`, {
      status: 500,
    });
  }
}

export const config = {
  matcher: "/blog/:path*",
};
