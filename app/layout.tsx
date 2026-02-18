import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";
import Header from "@/components/Header"; // ✅ Import Globally
import Footer from "@/components/Footer"; // ✅ Import Globally

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aapka Sach - The True Voice of Bharat",
  description: "Latest news, updates, and stories from India.",
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