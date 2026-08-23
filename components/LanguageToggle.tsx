"use client";

import { useEffect, useState } from "react";

function getLanguageFromCookie(): "hi" | "en" {
  if (typeof document === "undefined") return "hi";

  const savedLanguage = localStorage.getItem("aaj-ka-sach-language");
  if (savedLanguage === "hi" || savedLanguage === "en") return savedLanguage;

  const cookies = document.cookie.split(";");
  const langCookie = cookies.find((cookie) => cookie.trim().startsWith("googtrans="));
  return langCookie?.split("/").pop() === "en" ? "en" : "hi";
}

export default function LanguageToggle() {
  const [currentLang, setCurrentLang] = useState<"hi" | "en">(getLanguageFromCookie);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setCurrentLang(getLanguageFromCookie()), 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const switchLanguage = (lang: "hi" | "en") => {
    setCurrentLang(lang);
    localStorage.setItem("aaj-ka-sach-language", lang);

    if (lang === "hi") {
      const expiry = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
      const rootDomain = window.location.hostname.split(".").slice(-2).join(".");

      document.cookie = `googtrans=; path=/; ${expiry}`;
      document.cookie = `googtrans=; path=/; domain=${window.location.hostname}; ${expiry}`;
      document.cookie = `googtrans=; path=/; domain=.${rootDomain}; ${expiry}`;
    } else {
      document.cookie = "googtrans=/hi/en; path=/";
      document.cookie = `googtrans=/hi/en; path=/; domain=${window.location.hostname}`;
    }

    window.location.replace(`${window.location.pathname}${window.location.search}${window.location.hash}`);
  };

  return (
    <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1 text-xs font-bold border border-gray-300 dark:border-gray-600">
      
      {/* HINDI BUTTON */}
      <button
        onClick={() => switchLanguage("hi")}
        className={`px-3 py-1 rounded-full transition-all ${
          currentLang === "hi"
            ? "bg-tv10-red text-white shadow-md"
            : "text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
        }`}
      >
        HI
      </button>

      {/* ENGLISH BUTTON */}
      <button
        onClick={() => switchLanguage("en")}
        className={`px-3 py-1 rounded-full transition-all ${
          currentLang === "en"
            ? "bg-tv10-gold text-black shadow-md"
            : "text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
        }`}
      >
        EN
      </button>

    </div>
  );
}
