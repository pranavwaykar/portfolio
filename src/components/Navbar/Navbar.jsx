import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Navbar.scss';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const logoRef = useRef(null);
  const letterRefs = useRef([]);
  
  const menuItems = [
    { id: 'hero', label: 'HOME' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'contact', label: 'CONTACT' }
  ];

  // Initialize premium logo animation
  useEffect(() => {
    if (!logoRef.current) return;
    
    // Create letter elements
    const text = "PRANAV";
    logoRef.current.innerHTML = '';
    
    // Letter wrapper
    const letterWrapper = document.createElement('div');
    letterWrapper.className = 'letter-wrapper';
    
    // Create individual letters
    [...text].forEach((char, index) => {
      const letter = document.createElement('span');
      letter.className = 'logo-letter';
      letter.textContent = char;
      letterWrapper.appendChild(letter);
      letterRefs.current.push(letter);
    });
    
    logoRef.current.appendChild(letterWrapper);
    
    // Animate line
    const line = document.createElement('div');
    line.className = 'logo-line';
    logoRef.current.appendChild(line);
    
    // Initial animations
    gsap.set(line, { width: 0 });
    gsap.set(letterRefs.current, { opacity: 0, y: 20 });
    
    // Timeline
    const tl = gsap.timeline();
    
    // Animate letters in
    tl.to(letterRefs.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.out"
    });
    
    // Animate line
    tl.to(line, {
      width: "100%",
      duration: 0.7,
      ease: "power2.inOut"
    }, "-=0.2");
    
    // Subtle continuous animation
    gsap.to(line, {
      boxShadow: "0 1px 6px rgba(23, 92, 230, 0.6)",
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "sine.inOut"
    });
    
    return () => {
      tl.kill();
      gsap.killTweensOf(line);
      gsap.killTweensOf(letterRefs.current);
    };
  }, []);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section
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
      <div className="container">
        {/* Premium Logo */}
        <div 
          className="navbar__brand" 
          onClick={() => handleMenuClick('hero')}
          ref={logoRef}
        ></div>
        
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
      
      {/* Mobile Menu */}
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