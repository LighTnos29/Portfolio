import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef(null);
  const mobileMenuContentRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3 sm:pt-4 pb-0">
      <div className={`flex items-center justify-between max-w-7xl mx-auto
        px-4 sm:px-6 py-2.5 sm:py-3
        rounded-2xl
        transition-all duration-300
        ${scrolled
          ? 'bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_4px_32px_rgba(0,0,0,0.4)]'
          : 'bg-transparent border border-transparent'
        }`}>
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
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <a href="#home" className="transition-colors duration-300 text-sm lg:text-base xl:text-lg font-medium hover:text-white" style={{ color: '#D1DAE0', fontFamily: 'Poppins, sans-serif' }}>Home</a>
          <a href="#about" className="transition-colors duration-300 text-sm lg:text-base xl:text-lg font-medium hover:text-white" style={{ color: '#D1DAE0', fontFamily: 'Poppins, sans-serif' }}>About</a>
          <a href="#skills" className="transition-colors duration-300 text-sm lg:text-base xl:text-lg font-medium hover:text-white" style={{ color: '#D1DAE0', fontFamily: 'Poppins, sans-serif' }}>Skills</a>
          <a href="#projects" className="transition-colors duration-300 text-sm lg:text-base xl:text-lg font-medium hover:text-white" style={{ color: '#D1DAE0', fontFamily: 'Poppins, sans-serif' }}>Projects</a>
          <a href="#experience" className="transition-colors duration-300 text-sm lg:text-base xl:text-lg font-medium hover:text-white" style={{ color: '#D1DAE0', fontFamily: 'Poppins, sans-serif' }}>Experience</a>

          {/* Social Links */}
          <div className="flex items-center gap-2 ml-2">
            <a
              href="https://github.com/LighTnos29"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4 text-white/70 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/udit-agrawal-141292276/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 text-white/70 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

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

                {[
                  { href: '#home', label: 'Home' },
                  { href: '#about', label: 'About' },
                  { href: '#skills', label: 'Skills' },
                  { href: '#projects', label: 'Projects' },
                  { href: '#experience', label: 'Experience' },
                ].map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    className="flex items-center group py-4 px-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                    onClick={toggleMobileMenu}
                  >
                    <span className="text-base font-medium group-hover:text-white transition-colors" style={{ color: '#D1DAE0' }}>
                      {label}
                    </span>
                  </a>
                ))}
              </div>

              {/* Social Links Section */}
              <div className="pt-6 border-t border-white/10">
                <div className="text-xs uppercase tracking-wider text-white/50 mb-4 px-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Connect
                </div>
                <div className="flex items-center justify-center gap-3 px-4 mb-4">
                  <a
                    href="https://github.com/LighTnos29"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                    aria-label="GitHub"
                    onClick={toggleMobileMenu}
                  >
                    <svg className="w-5 h-5 text-white/70 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/udit-agrawal-141292276/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                    aria-label="LinkedIn"
                    onClick={toggleMobileMenu}
                  >
                    <svg className="w-5 h-5 text-white/70 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
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
