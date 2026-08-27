import StaticPage from "@/components/StaticPage";

export default function PrivacyPolicyPage() {
  return (
    <StaticPage
      title="Privacy Policy"
      subtitle="This Privacy Policy explains how we collect, use, and protect the information of readers interacting with Aaj Ka Sach."
      sections={[
        {
          heading: "Information Collection",
          body: [
            "We may collect basic information such as browser details, page interactions, and usage data to improve performance and user experience.",
            "We do not sell personal reader data to third parties.",
          ],
        },
        {
          heading: "Use of Information",
          body: [
            "Information is used to maintain site performance, provide relevant content, improve service quality, and support operational requirements.",
            "We may also use aggregated analytics to understand traffic patterns and audience engagement.",
          ],
        },
        {
          heading: "Cookies and Tracking",
          body: [
            "The website may use cookies and analytics tools to enhance functionality and measure website performance.",
            "If you prefer, you can disable cookies in your browser settings, although some website functionality may be affected.",
          ],
        },
      ]}
    />
  );
}
