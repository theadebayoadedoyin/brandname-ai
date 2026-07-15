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

  openGraph: {
    title: "BrandName AI",
    description:
  "Generate memorable, strategic brand names with thoughtful AI explanations. Built for founders, startups and creators.",

    type: "website",
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
