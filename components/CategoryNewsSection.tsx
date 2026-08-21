import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../sanityStudio/lib/client";
import { FaBolt } from "react-icons/fa";

type NewsItem = {
  _id: string;
  title?: string;
  slug?: { current?: string };
  category?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mainImage?: any;
  publishedAt?: string;
};

type CategoryNewsSectionProps = {
  title: string;
  categorySlug: string;
  categories: string[];
  news: NewsItem[];
  limit?: number;
};

export default function CategoryNewsSection({
  title,
  categorySlug,
  categories,
  news,
  limit = 4,
}: CategoryNewsSectionProps) {
  const normalized = categories.map((item) => item.toLowerCase());

  const sectionNews = news
    .filter((item) => {
      const dbCategory = item.category?.toLowerCase() || "";
      return normalized.includes(dbCategory);
    })
    .slice(0, limit);

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 mb-6">
        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-tv10-metal dark:text-white flex items-center gap-2">
          <FaBolt className="text-tv10-red" />
          {title}
        </h3>
        <Link
          href={`/${categorySlug}`}
          className="text-xs md:text-sm font-bold uppercase text-tv10-red hover:text-tv10-gold transition"
        >
          View All
        </Link>
      </div>

      {sectionNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectionNews.map((story) => (
            <Link
              href={`/news/${story.slug?.current || ""}`}
              key={story._id}
              className="group"
            >
              <article className="h-full bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300">
                <div className="relative aspect-video bg-gray-200 dark:bg-gray-800">
                  {story.mainImage ? (
                    <Image
                      src={urlFor(story.mainImage).url()}
                      alt={story.title || "News"}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                      No Image
                    </div>
                  )}
                  <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] uppercase font-bold px-2 py-1 rounded">
                    {story.category || title}
                  </span>
                </div>

                <div className="p-4">
                  <h4 className="text-base font-bold text-gray-900 dark:text-white leading-snug line-clamp-3 group-hover:text-tv10-red transition-colors">
                    {story.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-3 font-semibold">
                    {story.publishedAt
                      ? new Date(story.publishedAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "Latest"}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 p-10 text-center">
          <p className="text-gray-500 font-semibold">No updates yet for {title}.</p>
        </div>
      )}
    </section>
  );
}
