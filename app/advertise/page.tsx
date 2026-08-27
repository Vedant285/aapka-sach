import StaticPage from "@/components/StaticPage";

export default function AdvertisePage() {
  return (
    <StaticPage
      title="Advertise With Us"
      subtitle="Aaj Ka Sach offers advertising opportunities for brands seeking visibility among engaged regional and national audiences."
      sections={[
        {
          heading: "Partnership Opportunities",
          body: [
            "We offer banner placements, branded content, campaign visibility, and promotional partnerships across digital news sections and category pages.",
            "Our audience includes readers interested in politics, public life, business, culture, religion, and regional updates.",
          ],
        },
        {
          heading: "How to Enquire",
          body: [
            "Interested brands can contact the editorial or sales desk at editor@aapkasach.com for rates, campaign formats, and partnership details.",
            "We work with advertisers seeking meaningful brand visibility in a trusted news environment.",
          ],
        },
      ]}
    />
  );
}
