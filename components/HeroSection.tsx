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
  const rightTextStories = uniqueNews.slice(5, 9);
  const miniGridStories = uniqueNews.slice(9, 13);

  if (!mainStory) return null;

  return (
    <section className="container mx-auto px-4 py-6">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* LEFT: LATEST + thumbnail list */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="px-4 py-2 border-b-4 border-tv10-red">
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-900 dark:text-white">Latest</h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {latestStories.map((story) => (
                <Link href={`/news/${story.slug.current}`} key={story.slug.current}>
                  <div className="group flex gap-3 items-start p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="relative w-20 h-14 flex-shrink-0 rounded overflow-hidden bg-gray-200 dark:bg-gray-800">
                      {story.mainImage && (
                        <Image src={urlFor(story.mainImage).url()} alt={story.title} fill className="object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug line-clamp-3 group-hover:text-tv10-red transition-colors">
                        {story.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER: TOP NEWS — headline above image, mini grid below */}
        <div className="lg:col-span-6">
          {/* TOP NEWS label */}
          <div className="inline-flex items-center gap-2 bg-tv10-gold text-black text-xs font-black px-3 py-1 mb-3 rounded-sm uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-tv10-red animate-pulse inline-block"></span>
            Top News
          </div>

          <Link href={`/news/${mainStory.slug.current}`} className="group block mb-4">
            {/* Headline ABOVE image */}
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white leading-tight group-hover:text-tv10-red transition-colors mb-3">
              {mainStory.title}
            </h1>
            {/* Image */}
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md">
              {mainStory.mainImage && (
                <Image
                  src={urlFor(mainStory.mainImage).url()}
                  alt={mainStory.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              )}
              {mainStory.youtubeUrl && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-tv10-red/90 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                  <FaPlay className="ml-1" />
                </div>
              )}
              <span className="absolute top-2 left-2 bg-tv10-red text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                {mainStory.category || "Breaking"}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <FaClock className="text-[10px]" />
              {mainStory.publishedAt ? new Date(mainStory.publishedAt).toDateString() : ""}
            </p>
          </Link>

          {/* Mini 2-column grid below main story */}
          {miniGridStories.length > 0 && (
            <div className="grid grid-cols-2 gap-3 border-t border-gray-200 dark:border-gray-700 pt-4">
              {miniGridStories.map((story) => (
                <Link href={`/news/${story.slug.current}`} key={story.slug.current} className="group flex gap-2 items-start">
                  <div className="relative w-16 h-12 flex-shrink-0 rounded overflow-hidden bg-gray-200 dark:bg-gray-800">
                    {story.mainImage && (
                      <Image src={urlFor(story.mainImage).url()} alt={story.title} fill className="object-cover" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 leading-snug line-clamp-3 group-hover:text-tv10-red transition-colors">
                    {story.title}
                  </h4>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: text-only story links */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="px-4 py-2 border-b-4 border-tv10-red">
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-900 dark:text-white">More Stories</h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {rightTextStories.length > 0 ? rightTextStories.map((story) => (
                <Link href={`/news/${story.slug.current}`} key={story.slug.current}>
                  <div className="group p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-tv10-red transition-colors mb-1">
                      {story.title}
                    </h4>
                    <span className="text-[10px] text-gray-400 font-semibold uppercase inline-flex items-center gap-1">
                      <FaBolt className="text-tv10-gold" /> {story.category}
                    </span>
                  </div>
                </Link>
              )) : (
                <p className="p-4 text-xs text-gray-400">More stories coming soon.</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

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
                <div className="group flex gap-3 items-start rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="relative w-20 h-14 flex-shrink-0 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-800">
                    {story.mainImage && (
                      <Image
                        src={urlFor(story.mainImage).url()}
                        alt={story.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-tv10-red transition-colors">
                      {story.title}
                    </h4>
                    <span className="text-[10px] text-gray-500 font-semibold uppercase mt-1 inline-flex items-center gap-1">
                      <FaBolt className="text-tv10-gold" /> {story.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CENTER: MAIN TOP STORY */}
        <div className="lg:col-span-6 group cursor-pointer">
          <Link href={`/news/${mainStory.slug.current}`}>
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800">

              {/* Image — full width, no overlay */}
              <div className="relative w-full aspect-video overflow-hidden">
                {mainStory.mainImage && (
                  <Image
                    src={urlFor(mainStory.mainImage).url()}
                    alt={mainStory.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                {mainStory.youtubeUrl && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-tv10-red/90 text-white rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:scale-110 transition">
                    <FaPlay className="ml-1 text-xl" />
                  </div>
                )}
                <span className="absolute top-3 left-3 bg-tv10-gold text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-sm">
                  {mainStory.category || "Breaking"}
                </span>
              </div>

              {/* Headline below image */}
              <div className="p-5">
                <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white leading-snug group-hover:text-tv10-red transition-colors mb-3">
                  {mainStory.title}
                </h1>
                <div className="flex items-center text-gray-500 text-xs gap-2">
                  <FaClock />
                  <span>{mainStory.publishedAt ? new Date(mainStory.publishedAt).toDateString() : ""}</span>
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
