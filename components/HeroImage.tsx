import React from 'react';
import { Season } from '../types';

interface HeroImageProps {
  season: Season;
}

export const HeroImage: React.FC<HeroImageProps> = ({ season }) => {
  return (
    <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none bg-[#F8F4E8]">
      {/* 
        Primary Visual: Halftone Image
        Using explicit path to public folder as requested.
      */}
      <img
        src={season === 'spring' ? "/bg.png" : "/bg_2.png"}
        alt="Arctic dogsled adventure"
        className="absolute inset-0 w-full h-full object-cover object-[center_80%] md:object-center mix-blend-multiply opacity-100 transition-opacity duration-700 ease-in-out"
      />

      {/* 
        Vignette / Gradient 
        Seamless fade to the background color at the bottom.
      */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#F8F4E8] to-transparent z-20" />
    </div>
  );
};