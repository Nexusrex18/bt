import { NextRequest, NextResponse } from "next/server";

const GHOST_ORIGIN = "https://blog.pointblank.club";

export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith("/blog")) {
      const ghostPath = pathname.slice(6) || "/";

      const ghostUrl = new URL(ghostPath + request.nextUrl.search, GHOST_ORIGIN).toString();

      const ghostResponse = await fetch(ghostUrl, {
        method: request.method,
        headers: {
          ...Object.fromEntries(request.headers.entries()),
          host: new URL(GHOST_ORIGIN).host,
          "accept-encoding": "identity", // Critical: Disable compression to avoid garbled output
        },
        body: request.method === "GET" || request.method === "HEAD" ? null : request.body,
        redirect: "manual",
      });

      const responseHeaders = new Headers(ghostResponse.headers);
      responseHeaders.delete("content-encoding"); // Ensure no compression in response
      responseHeaders.delete("transfer-encoding");

      if (ghostResponse.status >= 300 && ghostResponse.status < 400) {
        const location = responseHeaders.get("location");
        if (location) {
          const newLocation = location.startsWith("/")
            ? `/blog${location}`
            : location.replace(GHOST_ORIGIN, "/blog");
          responseHeaders.set("location", newLocation);
        }
        return new NextResponse(null, {
          status: ghostResponse.status,
          headers: responseHeaders,
        });
      }

      const contentType = responseHeaders.get("content-type") || "";

      if (contentType.includes("text/html")) {
        const html = await ghostResponse.text();

        let modifiedHtml = html.replace(
          /(href|src|srcset|action|content|data-src|data-srcset|poster)=(["'])(\/(?!blog\/)|https:\/\/blog\.pointblank\.club(?=\/))/g,
          `$1=$2/blog/`
        );

        // Fix canonical and og:url
        modifiedHtml = modifiedHtml
          .replace(/https:\/\/blog\.pointblank\.club\//g, "https://btabc.vercel.app/blog/")
          .replace(/\/blog\/blog\//g, "/blog/"); // Prevent double /blog if any

        return new NextResponse(modifiedHtml, {
          status: ghostResponse.status,
          headers: responseHeaders,
        });
      }

      // For assets (CSS, JS, images) - stream directly
      if (ghostResponse.body) {
        return new NextResponse(ghostResponse.body, {
          status: ghostResponse.status,
          headers: responseHeaders,
        });
      }

      return new NextResponse(null, {
        status: ghostResponse.status,
        headers: responseHeaders,
      });
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return new NextResponse(`Internal Server Error: ${(error as Error).message || "Unknown"}`, {
      status: 500,
    });
  }
}

export const config = {
  matcher: "/blog/:path*",
};
