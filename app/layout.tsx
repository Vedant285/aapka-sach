import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleTranslateScript from "@/components/GoogleTranslateScript";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { AdSenseScript } from "@/components/AdSenseScript";

const inter = Inter({ subsets: ["latin"] });
const siteUrl = "https://aajkasach.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Aaj Ka Sach - The True Voice of Bharat",
  description: "Latest news, updates, and stories from India.",
  openGraph: {
    title: "Aaj Ka Sach - The True Voice of Bharat",
    description: "Latest news, updates, and stories from India.",
    images: [{ url: `${siteUrl}/logo.png`, width: 512, height: 512, alt: "Aaj Ka Sach" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaj Ka Sach - The True Voice of Bharat",
    description: "Latest news, updates, and stories from India.",
    images: [`${siteUrl}/logo.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 1. Global Dark Mode Colors 
         2. Flex Column layout ensures Footer stays at bottom
      */}
      <body className={`${inter.className} bg-white dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-300 flex flex-col min-h-screen`}>
        <GoogleTranslateScript />
        <AnalyticsTracker />
        <AdSenseScript />
        
        {/* MAIN CONTENT (This is where page.tsx, [slug], etc. are injected) */}
        <div className="flex-grow">
          {children}
        </div>

        {/* ✅ FOOTER (Appears on all pages) */}
        <Footer />

      </body>
    </html>
  );
}