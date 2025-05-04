import { useEffect, useRef } from 'react';
import { EXPERIENCES } from '../../../constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.scss';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const items = itemsRef.current;
    const isMobile = window.innerWidth <= 768;

    // Fade in section title
    gsap.fromTo(section.querySelector('.experience__heading'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        }
      }
    );

    // Animate timeline items
    items.forEach((item, index) => {
      const isLeft = index % 2 === 0;
      const content = item.querySelector('.experience__content');
      const dot = item.querySelector('.experience__dot');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse'
        }
      });

      // Different animation for mobile and desktop
      tl.fromTo(content,
        {
          opacity: 0,
          x: isMobile ? 50 : (isLeft ? -50 : 50), // Always slide from right on mobile
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out'
        }
      ).fromTo(dot,
        {
          scale: 0,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.7)'
        },
        '-=0.3'
      );

      // Add hover animation
      content.addEventListener('mouseenter', () => {
        gsap.to(dot, {
          scale: 1.2,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      content.addEventListener('mouseleave', () => {
        gsap.to(dot, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Handle window resize
    const handleResize = () => {
      const newIsMobile = window.innerWidth <= 768;
      if (newIsMobile !== isMobile) {
        // Refresh animations if needed
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  return (
    <section className="experience" id="experience" ref={sectionRef}>
      <div className="container">
        <h2 className="experience__heading">Experience</h2>
        <div className="experience__timeline" ref={timelineRef}>
          {EXPERIENCES.map((experience, index) => (
            <div 
              key={index} 
              className={`experience__item ${index % 2 === 0 ? 'left' : 'right'}`}
              ref={el => itemsRef.current[index] = el}
            >
              <div className="experience__dot"></div>
              <div className="experience__content">
                <h3 className="experience__role">{experience.role}</h3>
                <div className="experience__company">{experience.company}</div>
                <div className="experience__duration">{experience.duration}</div>
                <p className="experience__desc">{experience.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
