"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaSearch, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import LanguageToggle from "@/components/LanguageToggle";
import { getStoredLocale, subscribeToLanguage, translations, type Locale } from "@/lib/translations";

export default function Header() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = useSyncExternalStore(subscribeToLanguage, getStoredLocale, () => "hi") as Locale;
  const t = translations[locale];

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  // Keep DOM theme class and localStorage synced with React state.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const menuItems = t.nav;

  return (
    <header className="sticky top-0 z-50 shadow-lg font-sans">
      
      {/* 1. TOP BAR: date + ticker */}
      <div className="bg-brand-blue dark:bg-[#1a1a1a] text-white text-xs font-bold py-1.5 px-4 flex justify-between items-center border-b border-white/10 dark:border-gray-700 transition-colors duration-300">
        <div className="hidden md:block opacity-90 text-brand-gold shrink-0">{today}</div>
        <div className="flex-1 mx-4 overflow-hidden">
           <div className="whitespace-nowrap animate-ticker inline-block">
              <span className="bg-brand-red text-white px-2 py-0.5 rounded-sm mr-2 shadow-sm">BREAKING</span>
              Breaking headlines from Uttar Pradesh, Uttarakhand, Delhi, and beyond.
           </div>
        </div>
      </div>

      {/* 2. MAIN LOGO AREA */}
      <div className="bg-white dark:bg-[#222222] py-3 px-4 md:px-8 flex justify-between items-center relative z-20 transition-colors duration-300">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <div className="h-14 w-14 md:h-16 md:w-16 relative shrink-0">
             <img src="/logo.png" alt="Aaj Ka Sach" className="object-contain w-full h-full drop-shadow-lg" />
          </div>
        </Link>

        {/* CENTER: tagline + live badge */}
        <div className="hidden lg:flex flex-col items-center gap-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">{t.slogan}</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse inline-block"></span>
            <span className="text-xs font-black text-brand-red uppercase tracking-widest">{t.liveUpdates}</span>
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse inline-block"></span>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-3 md:gap-4">
          <form action="/search" className="hidden md:flex items-center bg-gray-100 dark:bg-[#333] rounded-full px-4 py-2 border border-gray-300 dark:border-gray-600 focus-within:ring-2 ring-brand-blue/20 dark:ring-white/20">
            <input 
              type="text" 
              name="q"
              placeholder={t.search} 
              className="bg-transparent outline-none text-sm text-gray-900 dark:text-white w-28 focus:w-44 transition-all font-bold placeholder-gray-500 dark:placeholder-gray-400"
            />
            <button type="submit" aria-label="Search" className="text-brand-blue dark:text-white"><FaSearch /></button>
          </form>
          <LanguageToggle />
          <button 
            onClick={toggleTheme} 
            className="p-2.5 rounded-full bg-gray-50 dark:bg-[#333] text-brand-blue dark:text-yellow-400 hover:bg-brand-blue hover:text-white transition shadow-sm shrink-0 border border-gray-200 dark:border-gray-600"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button className="md:hidden text-2xl text-brand-blue dark:text-white shrink-0" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* 3. NAVIGATION */}
      <nav className={`bg-brand-blue dark:bg-[#1a1a1a] text-white font-bold text-sm ${menuOpen ? 'block' : 'hidden md:block'} shadow-xl border-t-4 border-brand-gold transition-colors duration-300`}>
        <ul className="container mx-auto flex flex-col md:flex-row md:justify-center">
          {menuItems.map((item) => {
            const normalizedItem = item.toUpperCase();
            const linkUrl = normalizedItem === 'HOME' || normalizedItem === 'होम' ? '/' : `/${normalizedItem.toLowerCase().replace(/ /g, '-')}`;
            const isActive = pathname === linkUrl;
            return (
              <li key={item}>
                <Link 
                  href={linkUrl} 
                  onClick={() => setMenuOpen(false)} 
                  className={`block py-3 px-4 whitespace-nowrap transition-all duration-300 uppercase tracking-wider text-center border-b border-blue-800 dark:border-gray-800 md:border-b-0 ${
                    isActive
                      ? "bg-white text-brand-red font-black"
                      : "hover:bg-white hover:text-brand-red dark:hover:bg-[#333] dark:hover:text-brand-gold"
                  }`}
                >
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}