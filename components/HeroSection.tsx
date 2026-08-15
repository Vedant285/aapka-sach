import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../sanityStudio/lib/client";
import { FaPlay, FaClock, FaBolt } from "react-icons/fa";

type HeroNewsItem = {
  _id?: string;
  title: string;
  slug: { current: string };
  category?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mainImage?: any;
  youtubeUrl?: string;
  publishedAt?: string;
};

export default function HeroSection({ news }: { news: HeroNewsItem[] }) {
  if (!news || news.length === 0) return null;

  // Deduplicate by stable key so the same story does not appear in multiple columns.
  const seen = new Set<string>();
  const uniqueNews = news.filter((item) => {
    const key = item._id || item.slug?.current || item.title;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const mainStory = uniqueNews[0];
  const latestStories = uniqueNews.slice(1, 5);
  const rightStories = uniqueNews.slice(5, 9);

  if (!mainStory) return null;

  return (
    <section className="container mx-auto px-4 py-8">
      
      {/* SECTION TITLE */}
      <div className="flex items-center gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
        <span className="bg-tv10-red text-white text-xs font-bold px-2 py-1 rounded animate-pulse">LIVE</span>
        <h2 className="text-xl font-bold text-tv10-metal dark:text-white uppercase tracking-wider">
          Top Stories
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* LEFT: LATEST STORIES */}
        <div className="lg:col-span-3 bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-wider text-tv10-red mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
            Latest
          </h3>
          <div className="space-y-3">
            {latestStories.map((story) => (
              <Link href={`/news/${story.slug.current}`} key={story.slug.current}>
                <div className="group rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-tv10-red transition-colors">
                    {story.title}
                  </h4>
                  <span className="text-[10px] text-gray-500 font-semibold uppercase mt-1 inline-flex items-center gap-1">
                    <FaBolt className="text-tv10-gold" /> {story.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CENTER: MAIN TOP STORY */}
        <div className="lg:col-span-6 group cursor-pointer relative">
          <Link href={`/news/${mainStory.slug.current}`}>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
              {/* Image with Zoom Effect */}
              {mainStory.mainImage && (
                <Image
                  src={urlFor(mainStory.mainImage).url()}
                  alt={mainStory.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              )}
              
              {/* Premium Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

              {/* Play Button */}
              {mainStory.youtubeUrl && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-tv10-red/90 text-white rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:scale-110 transition">
                  <FaPlay className="ml-1 text-2xl" />
                </div>
              )}

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                <span className="inline-block bg-tv10-gold text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase mb-3 shadow-sm">
                  {mainStory.category || "Breaking"}
                </span>
                <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight drop-shadow-lg mb-2">
                  {mainStory.title}
                </h1>
                <div className="flex items-center text-gray-300 text-xs gap-3">
                  <span className="flex items-center gap-1"><FaClock /> {mainStory.publishedAt ? new Date(mainStory.publishedAt).toDateString() : ""}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* RIGHT: MORE STORIES */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          {rightStories.map((story) => (
            <Link href={`/news/${story.slug.current}`} key={story.slug.current}>
              <div className="flex gap-3 items-start group p-3 rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 hover:shadow-md transition">

                <div className="relative w-24 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-800">
                  {story.mainImage && (
                    <Image
                      src={urlFor(story.mainImage).url()}
                      alt={story.title}
                      fill
                      className="object-cover"
                    />
                  )}
                  {story.youtubeUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <FaPlay className="text-white text-xs" />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-tv10-red transition-colors">
                    {story.title}
                  </h3>
                  <span className="text-[10px] text-gray-500 font-semibold mt-1 inline-block uppercase">
                    {story.category}
                  </span>
                </div>

              </div>
            </Link>
          ))}
          {rightStories.length === 0 && (
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-dashed border-gray-200 dark:border-gray-700 text-xs text-gray-500 font-semibold">
              More unique stories will appear here as new posts are added.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
