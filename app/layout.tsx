import type { Metadata, Viewport } from "next";
import "@fontsource-variable/geist";
import "@fontsource-variable/bricolage-grotesque";
import "./globals.css";
import { SITE_URL } from "./site";


const TITLE = "AI Brand Name Generator for Founders | LexioMark";
const DESC = "Generate strategic brand names with the reasoning behind each one. Includes .com and .co checks and trademark search links. Built for founders in Africa and beyond.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | LexioMark" },
  description: DESC,
  applicationName: "LexioMark",
  alternates: { canonical: "/" },
  authors: [{ name: "Adebayo Adedoyin" }],
  creator: "Adebayo Adedoyin",
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE, description: DESC, url: SITE_URL, siteName: "LexioMark", type: "website",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "LexioMark brand name generator" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/opengraph-image.png"] },
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#E6EDFD" }, { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" }],
};

const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}