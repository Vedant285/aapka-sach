import StaticPage from "@/components/StaticPage";

export default function TermsPage() {
  return (
    <StaticPage
      title="Terms & Conditions"
      subtitle="These terms govern the use of the Aaj Ka Sach website and all related content and services."
      sections={[
        {
          heading: "Website Use",
          body: [
            "Users must use this website only for lawful and legitimate purposes. Misuse of the platform, including harmful or abusive conduct, is not allowed.",
            "The content on this website is intended for informational purposes and should not be treated as legal, financial, or professional advice.",
          ],
        },
        {
          heading: "Content and Copyright",
          body: [
            "All editorial content, articles, graphics, and media on this website are protected by applicable copyright and intellectual property laws.",
            "Unauthorized copying, duplication, or reposting is not permitted without written permission.",
          ],
        },
        {
          heading: "Editorial Independence",
          body: [
            "The website may contain sponsored content, advertising, or commercial partnerships, but editorial decisions remain guided by journalistic integrity and independence.",
            "We reserve the right to update these terms from time to time as needed.",
          ],
        },
      ]}
    />
  );
}
