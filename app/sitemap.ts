import type { MetadataRoute } from "next";
import { client } from "../sanityStudio/lib/sanity";

const siteUrl = "https://aajkasach.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch<{ slug: string; publishedAt?: string }[]>(`*[_type == "post" && defined(slug.current)] {
    "slug": slug.current,
    publishedAt
  }`);

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "hourly", priority: 1 },
    { url: `${siteUrl}/uttar-pradesh`, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteUrl}/uttarakhand`, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteUrl}/delhi`, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteUrl}/business`, changeFrequency: "daily", priority: 0.7 },
    { url: `${siteUrl}/sports`, changeFrequency: "daily", priority: 0.7 },
  ];

  return [
    ...staticPages,
    ...posts.map((post) => ({
      url: `${siteUrl}/news/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
