import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
});



export const metadata: Metadata = {
  title: "BrandName AI | Generate Strategic Brand Names",

  description:
    "Generate memorable, strategic brand names with thoughtful explanations—not random AI suggestions. Built for founders, startups, and creators.",

  metadataBase: new URL("https://brandname-ai-six.vercel.app"),

  applicationName: "BrandName AI",

  keywords: [
    "Brand Name Generator",
    "AI Brand Naming",
    "Startup Branding",
    "Business Name Generator",
    "Brand Strategy",
    "Founders",
  ],

  authors: [
    {
      name: "Adebayo Adedoyin",
    },
  ],

  creator: "Adebayo Adedoyin",

  robots: {
    index: true,
    follow: true,
  },
  
  openGraph: {
    title: "BrandName AI",
    description:
      "Generate memorable, strategic brand names with thoughtful AI explanations. Built for founders, startups and creators.",

    url: "https://brandname-ai-six.vercel.app",
    siteName: "BrandName AI",

    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "BrandName AI",
      },
    ],

    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "BrandName AI",
    description:
      "Generate memorable, strategic brand names with thoughtful AI explanations.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
  lang="en"
  className={`${inter.className} ${dmSerif.variable} h-full antialiased`}
>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
