"use client";

import { useSyncExternalStore } from "react";

const LANGUAGE_CHANGE_EVENT = "aaj-ka-sach-language-change";

function getSavedLanguage(): "hi" | "en" {
  if (typeof document === "undefined") return "hi";

  const savedLanguage = localStorage.getItem("aaj-ka-sach-language");
  if (savedLanguage === "hi" || savedLanguage === "en") return savedLanguage;
  return "hi";
}

function subscribeToLanguage(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(LANGUAGE_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, callback);
  };
}

export default function LanguageToggle() {
  const currentLang = useSyncExternalStore(
    subscribeToLanguage,
    getSavedLanguage,
    () => "hi"
  );

  const switchLanguage = (lang: "hi" | "en") => {
    localStorage.setItem("aaj-ka-sach-language", lang);
    window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));

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
