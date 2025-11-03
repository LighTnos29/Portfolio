import React, { useState, useEffect } from 'react';

const WhiteNoise = ({ opacity = 0.4, zIndex = 1000 }) => {
  const [noiseFrequency, setNoiseFrequency] = useState(0.85);

  useEffect(() => {
    const updateNoiseFrequency = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) { // Mobile
        setNoiseFrequency(0.75);
      } else if (screenWidth < 768) { // Tablet
        setNoiseFrequency(0.8);
      } else { // Desktop
        setNoiseFrequency(0.85);
      }
    };

    updateNoiseFrequency();
    window.addEventListener('resize', updateNoiseFrequency);
    
    return () => window.removeEventListener('resize', updateNoiseFrequency);
  }, []);

  return (
    <div 
      className="pointer-events-none absolute inset-0 w-full h-full"
      style={{
        zIndex: zIndex,
        opacity: opacity,
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='turbulence' baseFrequency='${noiseFrequency}' numOctaves='3' result='noise'/%3E%3CfeColorMatrix in='noise' type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 .5 .5 .7 .7 .9 1 1'/%3E%3C/feComponentTransfer%3E%3CfeColorMatrix type='matrix' values='1 1 1 0 0.8 1 1 1 0 0.8 1 1 1 0 0.8 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='white'/%3E%3C/svg%3E")
        `,
        mixBlendMode: 'screen'
      }}
    >
    </div>
  );
};

export default WhiteNoise;
