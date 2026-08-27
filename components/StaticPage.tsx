import Header from "@/components/Header";

type StaticSection = {
  heading: string;
  body: string[];
};

type StaticPageProps = {
  title: string;
  subtitle: string;
  sections: StaticSection[];
};

export default function StaticPage({ title, subtitle, sections }: StaticPageProps) {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#0a0a0a] dark:text-white">
      <Header />

      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#1a1a1a] md:p-10">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-tv10-red">Aaj Ka Sach</p>
          <h1 className="text-3xl font-black md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300 md:text-lg">{subtitle}</p>

          <div className="mt-10 space-y-8">
            {sections.map((section) => (
              <section key={section.heading} className="border-t border-gray-200 pt-6 dark:border-gray-800">
                <h2 className="text-xl font-black md:text-2xl">{section.heading}</h2>
                <div className="mt-4 space-y-3 text-base leading-7 text-gray-700 dark:text-gray-300">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
