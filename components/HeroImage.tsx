import React from 'react';
import { Season } from '../types';

interface HeroImageProps {
  season: Season;
}

export const HeroImage: React.FC<HeroImageProps> = ({ season }) => {
  return (
    <div
      className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none bg-[#F8F4E8]"
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform',
        contain: 'strict'
      }}
    >
      {/* 
        Primary Visual: Halftone Image
        Using explicit path to public folder as requested.
        GPU-accelerated for smooth mobile scrolling.
        Spring: show upper-mid section on mobile (20%)
        Fall: show lower section on mobile (80%)
      */}
      <img
        src={season === 'spring' ? `${import.meta.env.BASE_URL}bg.png` : `${import.meta.env.BASE_URL}bg_2.png`}
        alt="Arctic dogsled adventure"
        className={`absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-100 transition-opacity duration-700 ease-in-out ${season === 'spring' ? 'spring-bg-position' : ''}`}
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          objectPosition: season === 'spring' ? 'center 0%' : 'center 80%'
        }}
      />

      {/* 
        Vignette / Gradient 
        Seamless fade to the background color at the bottom.
      */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#F8F4E8] to-transparent z-20"
        style={{ transform: 'translateZ(0)' }}
      />
    </div>
  );
};