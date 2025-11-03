import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const BackgroundGradient = () => {
  const ball1Ref = useRef(null);
  const ball2Ref = useRef(null);
  const ball3Ref = useRef(null);

  useEffect(() => {
    // Get responsive animation ranges based on screen size
    const getAnimationRange = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) { // Mobile
        return { x: 150, y: 100 };
      } else if (screenWidth < 768) { // Tablet
        return { x: 250, y: 150 };
      } else if (screenWidth < 1024) { // Small desktop
        return { x: 400, y: 250 };
      } else { // Large desktop
        return { x: 600, y: 400 };
      }
    };

    const range = getAnimationRange();

    // Ball 1 - Blue ball responsive circular motion
    const tl1 = gsap.timeline({ repeat: -1 });
    tl1.to(ball1Ref.current, {
      x: range.x,
      y: 0,
      duration: 8,
      ease: "power1.inOut"
    })
    .to(ball1Ref.current, {
      x: range.x,
      y: range.y,
      duration: 8,
      ease: "power1.inOut"
    })
    .to(ball1Ref.current, {
      x: 0,
      y: range.y,
      duration: 8,
      ease: "power1.inOut"
    })
    .to(ball1Ref.current, {
      x: 0,
      y: 0,
      duration: 8,
      ease: "power1.inOut"
    });

    // Ball 2 - Purple ball responsive figure-8 motion
    const tl2 = gsap.timeline({ repeat: -1, delay: 4 });
    tl2.to(ball2Ref.current, {
      x: -range.x * 0.67,
      y: -range.y * 0.5,
      duration: 6,
      ease: "power2.inOut"
    })
    .to(ball2Ref.current, {
      x: 0,
      y: 0,
      duration: 6,
      ease: "power2.inOut"
    })
    .to(ball2Ref.current, {
      x: range.x * 0.67,
      y: range.y * 0.5,
      duration: 6,
      ease: "power2.inOut"
    })
    .to(ball2Ref.current, {
      x: 0,
      y: 0,
      duration: 6,
      ease: "power2.inOut"
    });

    // Ball 3 - Teal ball responsive orbital motion
    const tl3 = gsap.timeline({ repeat: -1, delay: 8 });
    tl3.to(ball3Ref.current, {
      x: range.x * 0.5,
      y: -range.y * 0.75,
      duration: 10,
      ease: "power1.inOut"
    })
    .to(ball3Ref.current, {
      x: -range.x * 0.5,
      y: -range.y * 0.75,
      duration: 10,
      ease: "power1.inOut"
    })
    .to(ball3Ref.current, {
      x: -range.x * 0.5,
      y: range.y * 0.75,
      duration: 10,
      ease: "power1.inOut"
    })
    .to(ball3Ref.current, {
      x: range.x * 0.5,
      y: range.y * 0.75,
      duration: 10,
      ease: "power1.inOut"
    });

    // Add subtle scaling animation to all balls
    gsap.to([ball1Ref.current, ball2Ref.current, ball3Ref.current], {
      scale: 1.3,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 2
    });

    // Opacity pulsing for mixing effect
    gsap.to([ball1Ref.current, ball2Ref.current, ball3Ref.current], {
      opacity: "+=0.2",
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 1.5
    });

  }, []);

  return (
    <>
      {/* Ball 1 - Lighter Blue gradient */}
      <div 
        ref={ball1Ref}
        className="fixed w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full opacity-25 pointer-events-none"
        style={{ 
          backgroundColor: '#93C5FD', 
          filter: 'blur(80px)',
          left: '5%',
          top: '10%',
          zIndex: 1
        }}>
      </div>
      
      {/* Ball 2 - Purple gradient */}
      <div 
        ref={ball2Ref}
        className="fixed w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] rounded-full opacity-20 pointer-events-none"
        style={{ 
          backgroundColor: '#8B5CF6', 
          filter: 'blur(70px)',
          right: '5%',
          top: '15%',
          zIndex: 1
        }}>
      </div>
      
      {/* Ball 3 - Teal gradient */}
      <div 
        ref={ball3Ref}
        className="fixed w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full opacity-18 pointer-events-none"
        style={{ 
          backgroundColor: '#06B6D4', 
          filter: 'blur(60px)',
          left: '45%',
          bottom: '10%',
          zIndex: 1
        }}>
      </div>
    </>
  );
};

export default BackgroundGradient;
