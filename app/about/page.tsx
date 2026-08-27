import StaticPage from "@/components/StaticPage";

export default function AboutPage() {
  return (
    <StaticPage
      title="About Us"
      subtitle="Aaj Ka Sach is dedicated to truthful, timely, and responsible journalism for Bharat. We focus on the issues, people, and stories that shape public life across Uttar Pradesh, Uttarakhand, Delhi, and beyond."
      sections={[
        {
          heading: "Our Mission",
          body: [
            "Aaj Ka Sach exists to make credible news accessible to readers who care about facts, accountability, and context.",
            "Our mission is to deliver clear, responsible reporting on politics, public life, business, culture, religion, and society while maintaining editorial integrity.",
          ],
        },
        {
          heading: "What We Cover",
          body: [
            "We cover local, regional, and national developments with a focus on grounded reporting, insightful analysis, and public-interest storytelling.",
            "Our newsroom tracks the issues that affect daily life, from government and policy to social change, business, sports, and dharma and sanskriti.",
          ],
        },
        {
          heading: "Our Promise",
          body: [
            "We believe journalism should be factual, fair, and useful. Every story we publish is guided by honesty, verification, and respect for the public trust.",
            "Aaj Ka Sach is committed to building a more informed and engaged Bharat.",
          ],
        },
      ]}
    />
  );
}
