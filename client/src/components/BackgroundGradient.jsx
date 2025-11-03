import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const BackgroundGradient = () => {
  const ball1Ref = useRef(null);
  const ball2Ref = useRef(null);
  const ball3Ref = useRef(null);

  useEffect(() => {
    // Ball 1 - Blue ball large circular motion across screen (slower)
    const tl1 = gsap.timeline({ repeat: -1 });
    tl1.to(ball1Ref.current, {
      x: 600,
      y: 0,
      duration: 8,
      ease: "power1.inOut"
    })
    .to(ball1Ref.current, {
      x: 600,
      y: 400,
      duration: 8,
      ease: "power1.inOut"
    })
    .to(ball1Ref.current, {
      x: 0,
      y: 400,
      duration: 8,
      ease: "power1.inOut"
    })
    .to(ball1Ref.current, {
      x: 0,
      y: 0,
      duration: 8,
      ease: "power1.inOut"
    });

    // Ball 2 - Purple ball figure-8 motion across screen (slower)
    const tl2 = gsap.timeline({ repeat: -1, delay: 4 });
    tl2.to(ball2Ref.current, {
      x: -400,
      y: -200,
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
      x: 400,
      y: 200,
      duration: 6,
      ease: "power2.inOut"
    })
    .to(ball2Ref.current, {
      x: 0,
      y: 0,
      duration: 6,
      ease: "power2.inOut"
    });

    // Ball 3 - Teal ball wide orbital motion (slower)
    const tl3 = gsap.timeline({ repeat: -1, delay: 8 });
    tl3.to(ball3Ref.current, {
      x: 300,
      y: -300,
      duration: 10,
      ease: "power1.inOut"
    })
    .to(ball3Ref.current, {
      x: -300,
      y: -300,
      duration: 10,
      ease: "power1.inOut"
    })
    .to(ball3Ref.current, {
      x: -300,
      y: 300,
      duration: 10,
      ease: "power1.inOut"
    })
    .to(ball3Ref.current, {
      x: 300,
      y: 300,
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
        className="fixed w-[600px] h-[600px] rounded-full opacity-25 pointer-events-none"
        style={{ 
          backgroundColor: '#93C5FD', 
          filter: 'blur(150px)',
          left: '5%',
          top: '10%',
          zIndex: 1
        }}>
      </div>
      
      {/* Ball 2 - Purple gradient */}
      <div 
        ref={ball2Ref}
        className="fixed w-[550px] h-[550px] rounded-full opacity-20 pointer-events-none"
        style={{ 
          backgroundColor: '#8B5CF6', 
          filter: 'blur(140px)',
          right: '5%',
          top: '15%',
          zIndex: 1
        }}>
      </div>
      
      {/* Ball 3 - Teal gradient */}
      <div 
        ref={ball3Ref}
        className="fixed w-[500px] h-[500px] rounded-full opacity-18 pointer-events-none"
        style={{ 
          backgroundColor: '#06B6D4', 
          filter: 'blur(130px)',
          left: '45%',
          bottom: '10%',
          zIndex: 1
        }}>
      </div>
    </>
  );
};

export default BackgroundGradient;
