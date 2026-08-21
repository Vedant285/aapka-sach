import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";
import Header from "@/components/Header"; 
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aapkasach.in"),
  title: "Aaj Ka Sach - The True Voice of Bharat",
  description: "Latest news, updates, and stories from India.",
  openGraph: {
    title: "Aaj Ka Sach - The True Voice of Bharat",
    description: "Latest news, updates, and stories from India.",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Aaj Ka Sach" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaj Ka Sach - The True Voice of Bharat",
    description: "Latest news, updates, and stories from India.",
    images: ["/logo.png"],
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
