import { client } from "../sanityStudio/lib/client";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StateTabs from "@/components/StateTabs";
import WebStories from "@/components/WebStories";
import DharmaSection from "@/components/DharmaSection";
import VideoSection from "@/components/VideoSection";
import MysterySection from "@/components/MysterySection";
import CategoryNewsSection from "@/components/CategoryNewsSection";

type HomeNewsItem = {
  _id: string;
  category?: string;
  publishedAt?: string;
  slug?: { current?: string };
  title?: string;
  mainImage?: unknown;
  youtubeUrl?: string;
};

// Updated Query to fetch data
async function getData() {
  const query = `{
    "news": *[_type == "post"] | order(publishedAt desc) {
      _id,
      title, 
      slug, 
      category, 
      mainImage, 
      youtubeUrl, 
      publishedAt
    },
    "stories": *[_type == "webStory"] | order(_createdAt desc) [0...6] {
      _id, title, slides, coverImage
    }
  }`;
  
  // Disable cache so you see new posts instantly
  return client.fetch(query, {}, { next: { revalidate: 0 } }); 
}

export default async function Home() {
  const { news, stories } = await getData();

  // LOGIC TO PREVENT DUPLICATES
  // 1. Identify the Main Story (The one big on top)
  const mainStoryId = news[0]?._id;

  // 2. Create a "Clean List" for the bottom sections
  // This removes the Main Story from the State Tabs so it doesn't repeat
  const newsWithoutHero = (news as HomeNewsItem[]).filter((item) => item._id !== mainStoryId);

  return (
    // FIX: Explicitly set background colors here
    // Light Mode: bg-gray-50 (Clean White/Grey)
    // Dark Mode: dark:bg-[#0a0a0a] (Deep Dark Grey - NOT Blue, NOT White)
    <main className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <Header />
      
      {/* 1. VISUAL STORIES */}
      <WebStories stories={stories} />

      {/* 2. HERO NEWS (Shows #1 Story Big + Next 4 on side) */}
      <HeroSection news={news} />

      {/* 3. STATE TABS (Uses the clean list, so #1 story won't repeat here) */}
      <StateTabs news={newsWithoutHero} />

      <CategoryNewsSection
        title="Business Stories"
        categorySlug="business"
        categories={["business"]}
        news={news}
      />

      <CategoryNewsSection
        title="Sports Stories"
        categorySlug="sports"
        categories={["sports"]}
        news={news}
      />

      <CategoryNewsSection
        title="Lifestyle Stories"
        categorySlug="lifestyle"
        categories={["lifestyle"]}
        news={news}
      />

      <CategoryNewsSection
        title="Mythological Stories"
        categorySlug="dharma"
        categories={["dharma", "mystery"]}
        news={news}
      />

      <DharmaSection news={news} />

      <VideoSection news={news} />

      <MysterySection news={news} />
      
      
    </main>
  );
}
