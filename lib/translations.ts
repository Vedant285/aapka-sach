export type Locale = "en" | "hi";

export const LANGUAGE_STORAGE_KEY = "aaj-ka-sach-language";
export const LANGUAGE_EVENT = "aaj-ka-sach-language-change";

export const defaultLocale: Locale = "hi";

export function getStoredLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;

  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return saved === "en" || saved === "hi" ? saved : defaultLocale;
}

export function subscribeToLanguage(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  window.addEventListener("storage", callback);
  window.addEventListener(LANGUAGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LANGUAGE_EVENT, callback);
  };
}

export function setStoredLocale(locale: Locale) {
  if (typeof window === "undefined") return;

  localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
  document.documentElement.lang = locale;
  window.dispatchEvent(new Event(LANGUAGE_EVENT));
}

export const translations = {
  en: {
    siteName: "Aaj Ka Sach",
    search: "Search",
    liveUpdates: "Live Updates 24/7",
    slogan: "Bharat Ka Sachcha Samachar",
    nav: [
      "HOME",
      "UTTAR PRADESH",
      "UTTARAKHAND",
      "DELHI",
      "DHARMA",
      "BUSINESS",
      "SPORTS",
      "LIFESTYLE",
      "OTHERS",
    ],
    footer: {
      brand: "Aaj Ka Sach",
      description:
        "Aaj Ka Sach is Bharat's leading digital news platform dedicated to bringing you the truth from Uttar Pradesh, Uttarakhand, and the world of Dharma.",
      categoriesLabel: "News Categories",
      companyLabel: "Company",
      contactLabel: "Contact Us",
      allRights: "All rights reserved.",
      designedBy: "Designed with ♥ for Bharat",
    },
    legal: {
      contactEmail: "editor@aapkasach.com",
      phone: "+91 98765 43210",
      location: "Noida Sector 62, Uttar Pradesh, India - 201309",
    },
  },
  hi: {
    siteName: "आज का सच",
    search: "खोजें",
    liveUpdates: "लाइव अपडेट 24/7",
    slogan: "भारत का सच्चा समाचार",
    nav: [
      "होम",
      "उत्तर प्रदेश",
      "उत्तराखंड",
      "दिल्ली",
      "धर्म",
      "बिजनेस",
      "स्पोर्ट्स",
      "लाइफस्टाइल",
      "अन्य",
    ],
    footer: {
      brand: "आज का सच",
      description:
        "आज का सच भारत का प्रमुख डिजिटल समाचार प्लेटफ़ॉर्म है, जो आपको उत्तर प्रदेश, उत्तराखंड और धर्म जगत से सच्ची खबरें देता है।",
      categoriesLabel: "समाचार श्रेणियाँ",
      companyLabel: "कंपनी",
      contactLabel: "संपर्क करें",
      allRights: "सभी अधिकार सुरक्षित।",
      designedBy: "भारत के लिए ♥ के साथ डिज़ाइन किया गया",
    },
    legal: {
      contactEmail: "editor@aapkasach.com",
      phone: "+91 98765 43210",
      location: "नोएडा सेक्टर 62, उत्तर प्रदेश, भारत - 201309",
    },
  },
} as const;

export function getLocalizedText(locale: Locale = getStoredLocale()) {
  return translations[locale];
}
