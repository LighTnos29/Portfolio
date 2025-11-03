import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <div className="text-white tracking-tighter text-3xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Lightnos.dev
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a 
            href="#work" 
            className="transition-colors duration-300 text-xl font-medium hover:text-white"
            style={{ color: '#D1DAE0', fontFamily: 'Poppins, sans-serif' }}
          >
            Work
          </a>
          <a 
            href="#experience" 
            className="transition-colors duration-300 text-xl font-medium hover:text-white"
            style={{ color: '#D1DAE0', fontFamily: 'Poppins, sans-serif' }}
          >
            Experience
          </a>
          <a 
            href="#about" 
            className="transition-colors duration-300 text-xl font-medium hover:text-white"
            style={{ color: '#D1DAE0', fontFamily: 'Poppins, sans-serif' }}
          >
            About
          </a>
          <a 
            href="#skills" 
            className="transition-colors duration-300 text-xl font-medium hover:text-white"
            style={{ color: '#D1DAE0', fontFamily: 'Poppins, sans-serif' }}
          >
            Skills
          </a>
          <a 
            href="#projects" 
            className="transition-colors duration-300 text-xl font-medium hover:text-white"
            style={{ color: '#D1DAE0', fontFamily: 'Poppins, sans-serif' }}
          >
            Projects
          </a>
          
          {/* Contact Button */}
          <a 
            href="#contact" 
            className="backdrop-blur-md bg-white/10 border border-white/20 px-5 py-2.5 rounded-full hover:bg-white/20 hover:border-white/40 hover:text-white transition-all duration-300 text-base font-medium"
            style={{ color: '#D1DAE0', fontFamily: 'Poppins, sans-serif' }}
          >
            Contact Me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="transition-colors duration-300" style={{ color: '#D1DAE0', fontFamily: 'Poppins, sans-serif' }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
