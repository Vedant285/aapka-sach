import Image from "next/image";
import { urlFor } from "../sanityStudio/lib/client"; // Ensure this path is correct for your setup
import { FaBolt } from "react-icons/fa";
import Link from "next/link";

export default function WebStories({ stories }: { stories: any[] }) {
  if (!stories || stories.length === 0) return null;

  return (
    // FIX: Changed 'dark:bg-tv10-metal' to 'dark:bg-[#1a1a1a]' (Dark Grey)
    <section className="bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 py-6 transition-colors duration-300">
      <div className="container mx-auto px-4">
        
        {/* HEADER */}
        <div className="flex items-center gap-2 mb-4 text-brand-red font-bold uppercase text-xs tracking-widest">
          <FaBolt />
          <span>Visual Stories</span>
        </div>

        {/* SCROLLABLE STRIP */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          
          {stories.map((story) => (
            <Link href={`/web-stories/${story.slug?.current || story._id}`} key={story._id}>
              <div className="flex-shrink-0 relative w-28 h-44 md:w-32 md:h-52 rounded-xl overflow-hidden cursor-pointer group border-2 border-transparent hover:border-brand-gold transition-all shadow-md">
                
                {/* IMAGE */}
                {story.coverImage ? (
                   <Image
                     src={urlFor(story.coverImage).url()}
                     alt={story.title}
                     fill
                     className="object-cover group-hover:scale-110 transition duration-700"
                   />
                ) : (story.slides && story.slides[0] && (
                  <Image
                    src={urlFor(story.slides[0]).url()}
                    alt={story.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700"
                  />
                ))}

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                
                {/* TITLE */}
                <div className="absolute bottom-0 left-0 p-3 w-full">
                  <p className="text-white text-[10px] md:text-xs font-bold leading-tight line-clamp-3 drop-shadow-sm">
                    {story.title}
                  </p>
                </div>
                
                {/* ICON */}
                <div className="absolute top-2 right-2 bg-black/40 p-1.5 rounded-full backdrop-blur-md border border-white/20">
                  <div className="w-3 h-3 rounded-full border-2 border-brand-gold bg-transparent"></div>
                </div>

              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}