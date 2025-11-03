import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const mobileMenuContentRef = useRef(null);

  const toggleMobileMenu = () => {
    if (!isMobileMenuOpen) {
      // Opening animation
      setIsMobileMenuOpen(true);
    } else {
      // Closing animation
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        x: 300,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => setIsMobileMenuOpen(false)
      });
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      // Set initial state and animate in
      gsap.set(mobileMenuRef.current, { opacity: 0, x: 300 });
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "power2.out"
      });

      // Animate menu items
      const menuItems = mobileMenuContentRef.current.children;
      gsap.set(menuItems, { opacity: 0, x: 30 });
      gsap.to(menuItems, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        stagger: 0.08,
        delay: 0.2,
        ease: "power2.out"
      });
    }
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <div
            className="text-white text-xl sm:text-2xl lg:text-3xl tracking-tighter"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Lightnos<span className="text-white/70">.dev</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <a
            href="#work"
            className="transition-colors duration-300 text-sm lg:text-base xl:text-lg font-medium hover:text-white"
            style={{ color: '#D1DAE0', fontFamily: 'Poppins, sans-serif' }}
          >
            Work
          </a>
          <a
            href="#experience"
            className="transition-colors duration-300 text-sm lg:text-base xl:text-lg font-medium hover:text-white"
            style={{ color: '#D1DAE0', fontFamily: 'Poppins, sans-serif' }}
          >
            Experience
          </a>
          <a
            href="#about"
            className="transition-colors duration-300 text-sm lg:text-base xl:text-lg font-medium hover:text-white"
            style={{ color: '#D1DAE0', fontFamily: 'Poppins, sans-serif' }}
          >
            About
          </a>
          <a
            href="#skills"
            className="transition-colors duration-300 text-sm lg:text-base xl:text-lg font-medium hover:text-white"
            style={{ color: '#D1DAE0', fontFamily: 'Poppins, sans-serif' }}
          >
            Skills
          </a>
          <a
            href="#projects"
            className="transition-colors duration-300 text-sm lg:text-base xl:text-lg font-medium hover:text-white"
            style={{ color: '#D1DAE0', fontFamily: 'Poppins, sans-serif' }}
          >
            Projects
          </a>

          {/* Contact Button */}
          <a
            href="#contact"
            className="backdrop-blur-md bg-white/10 border border-white/20 px-3 lg:px-5 py-2 lg:py-2.5 rounded-full hover:bg-white/20 hover:border-white/40 hover:text-white transition-all duration-300 text-sm lg:text-base font-medium"
            style={{ color: '#D1DAE0', fontFamily: 'Poppins, sans-serif' }}
          >
            Contact Me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="relative w-10 h-10 flex items-center justify-center backdrop-blur-md bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300"
            style={{ color: '#D1DAE0' }}
          >
            <div className="relative w-5 h-5">
              <span 
                className={`absolute left-0 w-5 h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 top-2' : 'top-1'}`}
              ></span>
              <span 
                className={`absolute left-0 w-5 h-0.5 bg-current transform transition-all duration-300 top-2 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
              ></span>
              <span 
                className={`absolute left-0 w-5 h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 top-2' : 'top-3'}`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}

      {/* Mobile Side Drawer Menu */}
      {isMobileMenuOpen && (
        <div 
          ref={mobileMenuRef} 
          className="fixed top-0 right-0 h-full w-80 max-w-[85vw] backdrop-blur-xl bg-black/40 border-l border-white/20 z-50 md:hidden rounded-l-3xl"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div 
                className="text-white font-bold text-xl tracking-tighter" 
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Menu
              </div>
              <button 
                onClick={toggleMobileMenu}
                className="w-10 h-10 flex items-center justify-center backdrop-blur-md bg-white/10 border border-white/20 rounded-full hover:bg-white/20 text-white/70 hover:text-white transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Items */}
            <div ref={mobileMenuContentRef} className="flex-1 px-6 py-8 space-y-4">
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-wider text-white/50 mb-6 px-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Navigate
                </div>
                
                <a 
                  href="#work" 
                  className="flex items-center group py-4 px-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  onClick={toggleMobileMenu}
                >
                  <span className="text-base font-medium group-hover:text-white transition-colors" style={{ color: '#D1DAE0' }}>
                    Work
                  </span>
                </a>

                <a 
                  href="#experience" 
                  className="flex items-center group py-4 px-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  onClick={toggleMobileMenu}
                >
                  <span className="text-base font-medium group-hover:text-white transition-colors" style={{ color: '#D1DAE0' }}>
                    Experience
                  </span>
                </a>

                <a 
                  href="#about" 
                  className="flex items-center group py-4 px-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  onClick={toggleMobileMenu}
                >
                  <span className="text-base font-medium group-hover:text-white transition-colors" style={{ color: '#D1DAE0' }}>
                    About
                  </span>
                </a>

                <a 
                  href="#skills" 
                  className="flex items-center group py-4 px-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  onClick={toggleMobileMenu}
                >
                  <span className="text-base font-medium group-hover:text-white transition-colors" style={{ color: '#D1DAE0' }}>
                    Skills
                  </span>
                </a>

                <a 
                  href="#projects" 
                  className="flex items-center group py-4 px-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  onClick={toggleMobileMenu}
                >
                  <span className="text-base font-medium group-hover:text-white transition-colors" style={{ color: '#D1DAE0' }}>
                    Projects
                  </span>
                </a>
              </div>

              {/* Contact Section */}
              <div className="pt-6 border-t border-white/10">
                <div className="text-xs uppercase tracking-wider text-white/50 mb-6 px-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Connect
                </div>
                <a 
                  href="#contact" 
                  className="flex items-center justify-center w-full py-5 px-6 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  onClick={toggleMobileMenu}
                >
                  <span className="text-base font-medium text-white">
                    Contact Me
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
