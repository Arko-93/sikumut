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
      {/* Spring Image (Winter/Ice) */}
      <img
        src={`${import.meta.env.BASE_URL}bg.jpg`}
        alt="Arctic dogsled adventure"
        className={`absolute inset-0 w-full h-full object-cover mix-blend-multiply transition-opacity duration-1000 ease-in-out spring-bg-position ${season === 'spring' ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          objectPosition: 'center 0%' /* Inline fallback for spring position */
        }}
      />

      {/* Fall Image (Sea/Boat) */}
      <img
        src={`${import.meta.env.BASE_URL}bg_2.jpg`}
        alt="Greenlandic hunter in boat"
        className={`absolute inset-0 w-full h-full object-cover mix-blend-multiply transition-opacity duration-1000 ease-in-out ${season === 'fall' ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          objectPosition: 'center 80%'
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