"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaSearch, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Date Logic
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  // Dark Mode Logic
  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark' || 
       (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  const menuItems = ['HOME', 'UTTAR PRADESH', 'UTTARAKHAND', 'DELHI', 'DHARMA', 'BUSINESS', 'SPORTS', 'LIFESTYLE'];

  return (
    <header className="sticky top-0 z-50 shadow-lg font-sans">
      
      {/* 1. TOP TICKER */}
      <div className="bg-brand-blue dark:bg-[#1a1a1a] text-white text-xs font-bold py-1.5 px-4 flex justify-between items-center border-b border-white/10 dark:border-gray-700 transition-colors duration-300">
        <div className="hidden md:block opacity-90 text-brand-gold">{today}</div>
        <div className="flex-1 mx-4 overflow-hidden relative group">
           <div className="whitespace-nowrap animate-ticker inline-block">
              <span className="bg-brand-red text-white px-2 py-0.5 rounded-sm mr-2 shadow-sm">BREAKING</span>
              Welcome to Aapka Sach Digital - The True Voice of Bharat...
           </div>
        </div>
      </div>

      {/* 2. MAIN LOGO AREA */}
      <div className="bg-white dark:bg-[#222222] py-4 px-4 md:px-8 flex justify-between items-center relative z-20 transition-colors duration-300">
        
        {/* LOGO AREA */}
        <Link href="/" className="flex items-center gap-3">
          {/* IMAGE LOGO */}
          <div className="h-16 w-16 md:h-20 md:w-20 relative shrink-0">
             <img src="/logo.png" alt="Aapka Sach" className="object-contain w-full h-full drop-shadow-lg" />
          </div>
          
          {/* TEXT LOGO */}
          <div className="flex flex-col justify-center leading-none">
            {/* AAPKA */}
            <div className="bg-gradient-to-r from-brand-red to-red-600 text-white font-black text-xl md:text-3xl px-2 py-0.5 rounded-sm transform -skew-x-12 shadow-md inline-block w-fit mb-1">
               AAPKA
            </div>
            {/* SACH */}
            <div className="bg-gradient-to-r from-brand-blue to-blue-800 dark:from-gray-700 dark:to-gray-800 text-white font-black text-2xl md:text-4xl px-2 py-0.5 rounded-sm transform -skew-x-12 shadow-md ml-4 border border-white/20">
               SACH
            </div>
          </div>
        </Link>

        {/* CONTROLS */}
        <div className="flex items-center gap-3 md:gap-5">
          
          {/* Search Bar - FIXED VISIBILITY */}
          <div className="hidden md:flex items-center bg-gray-100 dark:bg-[#333] rounded-full px-4 py-2 border border-gray-300 dark:border-gray-600 focus-within:ring-2 ring-brand-blue/20 dark:ring-white/20">
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent outline-none text-sm text-gray-900 dark:text-white w-32 focus:w-48 transition-all font-bold placeholder-gray-500 dark:placeholder-gray-400"
            />
            <FaSearch className="text-brand-blue dark:text-white" />
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="p-2.5 rounded-full bg-gray-50 dark:bg-[#333] text-brand-blue dark:text-yellow-400 hover:bg-brand-blue hover:text-white transition shadow-sm shrink-0 border border-gray-200 dark:border-gray-600"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Mobile Menu Icon */}
          <button className="md:hidden text-2xl text-brand-blue dark:text-white shrink-0 ml-1" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* 3. NAVIGATION MENU */}
      <nav className={`bg-brand-blue dark:bg-[#1a1a1a] text-white font-bold text-sm ${menuOpen ? 'block' : 'hidden md:block'} shadow-xl border-t-4 border-brand-gold transition-colors duration-300`}>
        <ul className="container mx-auto flex flex-col md:flex-row md:justify-center">
          {menuItems.map((item) => {
            const linkUrl = item === 'HOME' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`;
            return (
              <li key={item}>
                <Link 
                  href={linkUrl} 
                  onClick={() => setMenuOpen(false)} 
                  className="block py-3 px-6 hover:bg-white hover:text-brand-red dark:hover:bg-[#333] dark:hover:text-brand-gold transition-all duration-300 uppercase tracking-wider text-center border-b border-blue-800 dark:border-gray-800 md:border-b-0"
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