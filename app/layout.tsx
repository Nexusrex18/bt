import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PR Search - apache/dubbo-go",
  description: "Search pull requests from apache/dubbo-go repository",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
