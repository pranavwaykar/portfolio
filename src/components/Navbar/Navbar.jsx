import React, { useState, useEffect } from 'react';
import './Navbar.scss';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const menuItems = [
    { id: 'hero', label: 'HOME' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'contact', label: 'CONTACT' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Update active section based on scroll position
      const sections = menuItems.map(item => item.id);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuItems]);

  const handleMenuClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container-nav">
        {/* Logo */}
        <div className="navbar__brand" onClick={() => handleMenuClick('hero')}>
          <div className="navbar__logo">PW</div>
        </div>
        
        {/* Desktop Menu */}
        <div className="navbar__menu">
          {menuItems.map(item => (
            <div 
              key={item.id}
              className={`navbar__item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.id)}
            >
              {item.label}
            </div>
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <div 
          className="navbar__mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      <div className={`navbar__mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        {menuItems.map(item => (
          <div 
            key={item.id}
            className={`navbar__mobile-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => handleMenuClick(item.id)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar; 