import StaticPage from "@/components/StaticPage";

export default function ContactPage() {
  return (
    <StaticPage
      title="Contact Support"
      subtitle="We welcome feedback, press enquiries, partnership opportunities, and reader questions. Reach out to us through the details below."
      sections={[
        {
          heading: "Contact Information",
          body: [
            "Email: editor@aapkasach.com",
            "Phone: +91 98765 43210",
            "Address: Noida Sector 62, Uttar Pradesh, India - 201309",
          ],
        },
        {
          heading:"Editorial Enquiries",
          body: [
            "For news tips, corrections, or editorial conversations, please write to our editorial desk at editor@aapkasach.com.",
            "We review submissions and feedback regularly and aim to respond as quickly as possible.",
          ],
        },
      ]}
    />
  );
}
