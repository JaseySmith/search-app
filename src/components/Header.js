import React, { useState, useEffect } from 'react';
import DarkModeToggle from './DarkMode';

export default function Header() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleNavClick = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id="header" className={isScrolled ? 'scrolled' : ''}>
      <div className="container">
        {/* Logo */}
        <div>
            <a id="logo" href="/"><span>Scary</span> Places</a>
        </div>

        {/* Navigation menu */}
        <nav className={
          isNavExpanded ? "nav-menu expanded" : "nav-menu"
        }>
          <a onClick={handleNavClick} href="/">Home</a>
          <a onClick={handleNavClick} href="/contact">Contact</a>
          <a onClick={handleNavClick} href="/search">Search</a>
          <DarkModeToggle />
        </nav>
        <div className="burger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded)
        }}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </div>
    </div>
  );
}