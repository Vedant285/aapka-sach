import Link from "next/link";
import { FaArrowLeft, FaNewspaper } from "react-icons/fa";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      <Header />
      <section className="container mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
        <FaNewspaper className="text-5xl text-tv10-red" />
        <p className="mt-6 text-sm font-black uppercase tracking-widest text-tv10-red">404</p>
        <h1 className="mt-2 text-4xl font-black text-gray-900 dark:text-white">This news page is unavailable.</h1>
        <p className="mt-4 text-gray-500">The link may be incorrect, or the article may no longer be published.</p>
        <Link href="/" className="mt-8 inline-flex items-center gap-2 bg-tv10-red px-5 py-3 font-black text-white hover:bg-red-700">
          <FaArrowLeft /> Back to Latest News
        </Link>
      </section>
    </main>
  );
}
