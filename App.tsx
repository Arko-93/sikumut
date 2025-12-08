import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import { HeroImage } from './components/HeroImage';
import { CONTENT } from './constants';
import { Language, Season } from './types';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [season, setSeason] = useState<Season>('spring');
  const [showMap, setShowMap] = useState(false);
  const [copied, setCopied] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const content = CONTENT[lang];
  const seasonContent = season === 'spring' ? content.spring : content.fall;

  const handleCopy = () => {
    navigator.clipboard.writeText(content.contact);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Close map when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mapRef.current && !mapRef.current.contains(event.target as Node)) {
        setShowMap(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Helper function to render text with popovers for special terms
  const renderParagraphWithPopovers = (paragraph: string, index: number) => {
    // For Kalaallisut, no popovers needed - words are already in Kalaallisut
    if (lang === 'kl') {
      return (
        <p key={index} className={index === 0 ? "font-bold text-black max-w-md" : "text-black/80 max-w-md"}>
          {paragraph}
        </p>
      );
    }

    // Check for both Qimusseriarsuaq and Silarsuaq kisimi naalangaavoq
    const hasQimusseriarsuaq = paragraph.includes("Qimusseriarsuaq");
    const hasSilarsuaq = paragraph.includes("Silarsuaq kisimi naalangaavoq");

    if (!hasQimusseriarsuaq && !hasSilarsuaq) {
      return (
        <p key={index} className={index === 0 ? "font-bold text-black max-w-md" : "text-black/80 max-w-md"}>
          {paragraph}
        </p>
      );
    }

    // Process the paragraph for special terms
    let elements: React.ReactNode[] = [];
    let remainingText = paragraph;
    let keyCounter = 0;

    // Process Silarsuaq first (it appears in the first paragraph)
    if (hasSilarsuaq) {
      const parts = remainingText.split("Silarsuaq kisimi naalangaavoq");
      elements.push(<span key={keyCounter++}>{parts[0]}</span>);
      elements.push(
        <span key={keyCounter++} className="relative group cursor-help inline-block">
          <span className="underline decoration-dotted underline-offset-4 decoration-black/40">Silarsuaq kisimi naalangaavoq</span>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 p-2 bg-black text-[#F8F4E8] text-xs rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center z-50">
            {content.weatherDefinition}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></span>
          </span>
        </span>
      );
      remainingText = parts.slice(1).join("Silarsuaq kisimi naalangaavoq");
    }

    // Process Qimusseriarsuaq
    if (hasQimusseriarsuaq && remainingText.includes("Qimusseriarsuaq")) {
      const parts = remainingText.split("Qimusseriarsuaq");
      elements.push(<span key={keyCounter++}>{parts[0]}</span>);
      elements.push(
        <span key={keyCounter++} className="relative group cursor-help inline-block">
          <span className="underline decoration-dotted underline-offset-4 decoration-black/40">Qimusseriarsuaq</span>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-black text-[#F8F4E8] text-xs rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center z-50">
            {content.qimusseriarsuaqDefinition.replace('Meaning: ', '')}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></span>
          </span>
        </span>
      );
      remainingText = parts.slice(1).join("Qimusseriarsuaq");
    }

    // Add any remaining text
    if (remainingText) {
      elements.push(<span key={keyCounter++}>{remainingText}</span>);
    }

    // If we haven't processed anything yet (no special terms found in the expected pattern)
    if (elements.length === 0) {
      elements = [<span key={0}>{paragraph}</span>];
    }

    return (
      <p key={index} className={index === 0 ? "font-bold text-black max-w-md" : "text-black/80 max-w-md"}>
        {elements}
      </p>
    );
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden text-[#1a1a1a]"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* Noise Texture Overlay - hidden on mobile for performance */}
      <div className="bg-noise hidden md:block" />

      {/* Navbar (Unified Pill) */}
      <Navbar currentLang={lang} setLang={setLang} />

      {/* Background Visuals */}
      <HeroImage season={season} />

      {/* MOBILE LAYOUT (< md) */}
      <main className="relative z-10 w-full min-h-screen flex flex-col md:hidden">
        {/* Spacer for navbar */}
        <div className="h-24"></div>

        {/* Location & Season - Mobile */}
        <div className="px-6 py-6">
          <div className="flex flex-col gap-5 text-xs font-bold tracking-widest uppercase bg-[#F8F4E8]/80 p-5 rounded-sm border border-black/5">
            <div className="flex flex-col relative" ref={mapRef}>
              <span className="opacity-40 mb-1">{content.locationLabel}</span>
              <button
                onClick={() => setShowMap(!showMap)}
                className="hover:opacity-70 transition-opacity text-left uppercase font-bold tracking-widest underline decoration-dotted underline-offset-4 decoration-black/40"
              >
                {content.location}
              </button>

              {/* Mobile Map Popup - Full width below button */}
              {showMap && (
                <div className="mt-4 z-50 p-1 bg-[#F8F4E8] rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200 w-full border border-black/10">
                  <div className="relative w-full h-[180px] overflow-hidden rounded-sm bg-[#F8F4E8]">
                    <iframe
                      width="100%"
                      height="100%"
                      title="Map of Qimusseriarsuaq"
                      src="https://www.openstreetmap.org/export/embed.html?bbox=-66.0000%2C75.0000%2C-56.0000%2C77.0000&amp;layer=mapnik"
                      className="absolute top-0 left-0 w-full h-[120%] border-0 grayscale contrast-125 brightness-105 mix-blend-multiply"
                    ></iframe>
                  </div>
                  <div className="flex flex-col px-4 py-3 text-[10px] text-center font-medium tracking-wide uppercase border-t border-black/5 mt-1 bg-[#F8F4E8]">
                    <span className="text-black font-bold mb-0.5">Qimusseriarsuaq</span>
                    <span className="text-black/60">{content.qimusseriarsuaqDefinition}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="opacity-40 mb-1">{content.seasonLabel}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSeason('spring')}
                  className={`transition-colors px-1 -mx-1 hover:bg-black hover:text-[#F8F4E8] hover:opacity-100 ${season === 'spring' ? 'opacity-100' : 'opacity-40'}`}
                >
                  {content.season}
                </button>
                <span className="opacity-40">/</span>
                <button
                  onClick={() => setSeason('fall')}
                  className={`transition-colors px-1 -mx-1 hover:bg-black hover:text-[#F8F4E8] hover:opacity-100 ${season === 'fall' ? 'opacity-100' : 'opacity-40'}`}
                >
                  {content.seasonFall}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Flexible spacer to push content down and let image breathe */}
        <div className="flex-1 min-h-[30vh]"></div>

        {/* Statement / Description - Mobile */}
        <div className="px-6 pb-6">
          <div className="bg-[#F8F4E8]/70 p-5 rounded-sm space-y-4 text-xs font-light leading-relaxed">
            {seasonContent.description.map((paragraph, index) =>
              renderParagraphWithPopovers(paragraph, index)
            )}

            {seasonContent.bottomColumns && (
              <div className="flex flex-col gap-4 pt-2 text-black/80 border-t border-black/10 mt-4">
                {seasonContent.bottomColumns.map((col, index) => (
                  <p key={index} className={index > 0 ? "font-bold text-black" : ""}>
                    {col}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Inquiries - Mobile */}
        <div className="px-6 pb-8">
          <div className="text-xs font-bold tracking-widest uppercase">
            <span className="opacity-40 block mb-1">{content.inquiriesLabel}</span>
            <div className="flex items-center gap-3">
              <a href={`mailto:${content.contact}`} className="hover:bg-black hover:text-[#F8F4E8] transition-colors w-max px-1 -ml-1">
                {content.contact}
              </a>
              <button
                onClick={handleCopy}
                className="opacity-40 hover:opacity-100 transition-opacity"
                aria-label="Copy email"
              >
                {copied ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer spacer for mobile */}
        <div className="h-8"></div>
      </main>

      {/* DESKTOP LAYOUT (md+) */}
      <main className="relative z-10 w-full h-screen pointer-events-none hidden md:block">

        {/* Location & Season - Top Right */}
        <div className="absolute top-32 right-12 flex flex-col gap-6 text-sm font-bold tracking-widest uppercase text-right pointer-events-auto bg-[#F8F4E8]/60 backdrop-blur-[2px] p-6 rounded-sm border border-black/5">
          <div className="flex flex-col items-end relative" ref={mapRef}>
            <span className="opacity-40 mb-1">{content.locationLabel}</span>
            <button
              onClick={() => setShowMap(!showMap)}
              className="hover:opacity-70 transition-opacity text-right uppercase font-bold tracking-widest underline decoration-dotted underline-offset-4 decoration-black/40"
            >
              {content.location}
            </button>

            {showMap && (
              <div className="absolute top-0 right-full mr-12 z-50 p-1 bg-[#F8F4E8] rounded-sm shadow-2xl animate-in fade-in zoom-in-95 slide-in-from-right-2 duration-200 w-[300px] border border-black/10">
                <div className="relative w-full h-[200px] overflow-hidden rounded-sm bg-[#F8F4E8]">
                  <iframe
                    width="100%"
                    height="100%"
                    title="Map of Qimusseriarsuaq"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-66.0000%2C75.0000%2C-56.0000%2C77.0000&amp;layer=mapnik"
                    className="absolute top-0 left-0 w-full h-[120%] border-0 grayscale contrast-125 brightness-105 mix-blend-multiply"
                  ></iframe>
                </div>
                <div className="flex flex-col px-4 py-3 text-[10px] text-center font-medium tracking-wide uppercase border-t border-black/5 mt-1 bg-[#F8F4E8]">
                  <span className="text-black font-bold mb-0.5">Qimusseriarsuaq</span>
                  <span className="text-black/60">{content.qimusseriarsuaqDefinition}</span>
                </div>
                {/* Arrow Indicator (Tail) */}
                <div className="absolute top-7 -right-[9px] border-y-[9px] border-y-transparent border-l-[9px] border-l-black/10"></div>
                <div className="absolute top-[29px] -right-[8px] border-y-[8px] border-y-transparent border-l-[8px] border-l-[#F8F4E8]"></div>
              </div>
            )}
          </div>
          <div className="flex flex-col items-end">
            <span className="opacity-40 mb-1">{content.seasonLabel}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setSeason('spring')}
                className={`transition-colors px-1 -mx-1 hover:bg-black hover:text-[#F8F4E8] hover:opacity-100 ${season === 'spring' ? 'opacity-100' : 'opacity-40'}`}
              >
                {content.season}
              </button>
              <span className="opacity-40">/</span>
              <button
                onClick={() => setSeason('fall')}
                className={`transition-colors px-1 -mx-1 hover:bg-black hover:text-[#F8F4E8] hover:opacity-100 ${season === 'fall' ? 'opacity-100' : 'opacity-40'}`}
              >
                {content.seasonFall}
              </button>
            </div>
          </div>
        </div>

        {/* Statement / Description - Bottom Left */}
        <div className="absolute bottom-8 left-12 max-w-5xl pointer-events-auto">
          <div className="space-y-4 text-sm font-light leading-relaxed">
            <div className="bg-[#F8F4E8]/15 backdrop-blur-[1px] p-5 rounded-sm space-y-4 max-w-md">
              {seasonContent.description.map((paragraph, index) =>
                renderParagraphWithPopovers(paragraph, index)
              )}
            </div>

            {seasonContent.bottomColumns && (
              <div className="grid grid-cols-3 gap-8 pt-4 text-black/80 pl-5">
                {seasonContent.bottomColumns.map((col, index) => (
                  <p key={index} className={index > 0 ? "font-bold text-black" : ""}>
                    {col}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Inquiries - Bottom Right */}
        <div className="absolute bottom-8 right-12 text-sm font-bold tracking-widest uppercase text-right pointer-events-auto">
          <div className="flex flex-col items-end">
            <span className="opacity-40 mb-1">{content.inquiriesLabel}</span>
            <div className="flex items-center gap-3">
              <a href={`mailto:${content.contact}`} className="hover:bg-black hover:text-[#F8F4E8] transition-colors w-max px-1 -ml-1">
                {content.contact}
              </a>
              <button
                onClick={handleCopy}
                className="opacity-40 hover:opacity-100 transition-opacity"
                aria-label="Copy email"
              >
                {copied ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* Footer / Copyright - centralized */}
      <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 text-[10px] uppercase opacity-30 mix-blend-multiply pointer-events-none whitespace-nowrap">
        &copy; {new Date().getFullYear()} Sikumut.
      </footer>
    </div>
  );
};

export default App;