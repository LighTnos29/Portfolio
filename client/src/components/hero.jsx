import React from 'react';
import WhiteNoise from './WhiteNoise';

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center"
         style={{ backgroundColor: '#000000' }}>
      
      {/* Local white noise overlay for hero section */}
      <WhiteNoise opacity={0.04} zIndex={10} />
      
      {/* Hero content can be added here */}
      
    </div>
  );
};

export default Hero;
