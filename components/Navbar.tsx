import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';

interface NavbarProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentLang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string }[] = [
    { code: 'kl', label: 'Kalaallisut' },
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
  ];

  const currentLabel = languages.find(l => l.code === currentLang)?.label;

  // Filter out current language for the "rest" in the dropdown
  const availableLanguages = languages.filter(l => l.code !== currentLang);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-8 left-0 w-full z-50 flex justify-center pointer-events-none">
      <nav
        ref={dropdownRef}
        className="pointer-events-auto bg-[#F8F4E8]/60 backdrop-blur-md border border-[#1a1a1a]/5 rounded-sm pl-5 pr-2 py-2 flex items-center gap-4 shadow-sm transition-all duration-300 relative"
      >
        {/* Brand Logo */}
        <a
          href="#home"
          className="hover:opacity-70 transition-opacity flex-shrink-0"
        >
          <img
            src={`${import.meta.env.BASE_URL}sikumut-logo-navbar-horizontal-tagline.png`}
            alt="Sikumut"
            className="h-8 md:h-11 w-auto max-w-[140px] md:max-w-none object-contain"
          />
        </a>

        {/* Divider */}
        <div className="w-px h-3 bg-[#1a1a1a]/20"></div>

        {/* Language Switcher */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-sm font-normal text-[#1a1a1a] hover:bg-black hover:text-[#F8F4E8] rounded-sm px-3 py-1 flex items-center gap-2 transition-colors outline-none"
            aria-label="Select Language"
          >
            <span>{currentLabel}</span>
            <svg
              className={`w-3 h-3 text-[#1a1a1a]/40 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full right-0 mt-2 min-w-[120px] bg-[#F8F4E8] border border-[#1a1a1a]/10 rounded-sm shadow-xl overflow-hidden flex flex-col py-1 animate-in fade-in zoom-in-95 duration-100">
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLang(lang.code);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2.5 text-left text-xs transition-colors hover:bg-black flex justify-between items-center text-[#1a1a1a]/80 hover:text-[#F8F4E8]"
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;