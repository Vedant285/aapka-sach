"use client";

import { useState } from "react";
import { FaCheck, FaCopy, FaFacebookF, FaTelegram, FaWhatsapp, FaXTwitter } from "react-icons/fa6";

type ArticleShareButtonsProps = {
  title: string;
  url: string;
};

export default function ArticleShareButtons({ title, url }: ArticleShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const message = `${title}\n\n${url}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(message)}`, icon: FaWhatsapp, className: "bg-[#25D366]" },
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, icon: FaFacebookF, className: "bg-[#1877F2]" },
    { label: "Share on X", href: `https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, icon: FaXTwitter, className: "bg-black" },
    { label: "Share on Telegram", href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, icon: FaTelegram, className: "bg-[#229ED9]" },
  ];

  return (
    <div className="flex items-center gap-2">
      {shareLinks.map(({ label, href, icon: Icon, className }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          title={label}
          className={`flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:-translate-y-0.5 hover:brightness-110 ${className}`}
        >
          <Icon className="text-sm" />
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy article link"
        title="Copy article link"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 transition hover:-translate-y-0.5 hover:border-tv10-red hover:text-tv10-red dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
      >
        {copied ? <FaCheck className="text-sm text-green-500" /> : <FaCopy className="text-sm" />}
      </button>
    </div>
  );
}
