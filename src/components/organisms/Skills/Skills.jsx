import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import './Skills.scss';

gsap.registerPlugin(ScrollTrigger, CustomEase);

const skills = [
  {
    group: 'Frontend',
    icon: '🎨',
    color: '#FF6B6B',
    gradient: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
    glow: 'rgba(255, 107, 107, 0.5)',
    items: [
      { name: 'React', level: 95, icon: '⚛️', description: 'Advanced component architecture, Redux, Context API' },
      { name: 'JavaScript', level: 90, icon: '📜', description: 'ES6+, TypeScript, Modern JS features' },
      { name: 'HTML5', level: 95, icon: '🌐', description: 'Semantic markup, SEO, Accessibility' },
      { name: 'CSS3', level: 90, icon: '🎨', description: 'Modern layouts, Animations, Flexbox/Grid' },
      { name: 'SASS', level: 85, icon: '💅', description: 'Advanced preprocessor, Mixins, Functions' },
      { name: 'TypeScript', level: 85, icon: '📘', description: 'Type-safe development, Interfaces, Generics' }
    ],
  },
  {
    group: 'Backend',
    icon: '⚡',
    color: '#4ECDC4',
    gradient: 'linear-gradient(135deg, #4ECDC4, #45B7AF)',
    glow: 'rgba(78, 205, 196, 0.5)',
    items: [
      { name: 'Node.js', level: 85, icon: '🟢', description: 'Server-side JavaScript, Express, APIs' },
      { name: 'Express', level: 80, icon: '🚂', description: 'RESTful APIs, Middleware, Authentication' },
      { name: 'MongoDB', level: 75, icon: '🍃', description: 'NoSQL database, Mongoose, Aggregation' }
    ],
  },
  {
    group: 'Tools',
    icon: '🛠️',
    color: '#FFD93D',
    gradient: 'linear-gradient(135deg, #FFD93D, #FFE566)',
    glow: 'rgba(255, 217, 61, 0.5)',
    items: [
      { name: 'Git', level: 90, icon: '📚', description: 'Version control, Branching strategies, CI/CD' },
      { name: 'Figma', level: 85, icon: '🎨', description: 'UI/UX design, Prototyping, Components' },
      { name: 'Vite', level: 80, icon: '⚡', description: 'Modern build tools, HMR, Optimization' },
      { name: 'Jest', level: 75, icon: '🃏', description: 'Unit testing, Integration tests, Mocking' }
    ],
  },
];

const Skills = () => {
  const [activeGroup, setActiveGroup] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const groupRefs = useRef([]);
  const skillRefs = useRef({});
  const particlesRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create custom ease for smoother animations
    CustomEase.create("bounce", "0.68, -0.55, 0.265, 1.55");

    // Floating animation for particles
    gsap.to(particlesRef.current, {
      y: -50,
      duration: 3,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1
    });

    // Initial section animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top center+=100',
        end: 'bottom center',
        toggleActions: 'play none none reverse'
      }
    });

    tl.from(container, {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: 'power3.out'
    })
    .from('.skills__heading-text', {
      opacity: 0,
      y: 50,
      rotateX: -90,
      duration: 1,
      ease: 'bounce'
    })
    .from('.skills__heading-line', {
      width: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5');

    // Animate groups with stagger
    groupRefs.current.forEach((group, index) => {
      gsap.from(group, {
        opacity: 0,
        x: index % 2 === 0 ? -100 : 100,
        rotateY: -30,
        duration: 1,
        delay: index * 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: group,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Handle mouse movement for 3D effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      setMousePosition({ x, y });

      groupRefs.current.forEach((group) => {
        if (!group) return;
        const rect = group.getBoundingClientRect();
        const mouseX = ((clientX - rect.left) / rect.width) * 100;
        const mouseY = ((clientY - rect.top) / rect.height) * 100;
        group.style.setProperty('--mouse-x', `${mouseX}%`);
        group.style.setProperty('--mouse-y', `${mouseY}%`);
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Apply 3D rotation based on mouse position
  useEffect(() => {
    groupRefs.current.forEach((group, idx) => {
      if (!group || activeGroup !== null) return;
      gsap.to(group, {
        rotateY: mousePosition.x * 10,
        rotateX: -mousePosition.y * 10,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  }, [mousePosition, activeGroup]);

  const handleGroupHover = (index) => {
    setActiveGroup(index);
    
    groupRefs.current.forEach((group, idx) => {
      gsap.to(group, {
        scale: idx === index ? 1.05 : 0.95,
        opacity: idx === index ? 1 : 0.7,
        rotateY: 0,
        rotateX: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  };

  const handleGroupLeave = () => {
    setActiveGroup(null);
    
    groupRefs.current.forEach((group) => {
      gsap.to(group, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  };

  const handleSkillClick = (skill) => {
    setSelectedSkill(prev => prev?.name === skill.name ? null : skill);
    
    const skillEl = skillRefs.current[skill.name];
    if (skillEl) {
      // Create ripple effect
      const ripple = document.createElement('div');
      ripple.className = 'skills__ripple';
      skillEl.appendChild(ripple);

      gsap.to(ripple, {
        scale: 1.5,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => ripple.remove()
      });

      // Animate skill element
      gsap.to(skillEl, {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out'
      });

      // Animate progress bar
      const progressBar = skillEl.querySelector('.skills__progress-bar');
      gsap.fromTo(progressBar,
        { width: 0 },
        {
          width: `${skill.level}%`,
          duration: 0.8,
          ease: 'power2.out'
        }
      );
    }
  };

  return (
    <section className="skills" id="skills" ref={containerRef}>
      <div className="skills__background">
        <div className="skills__gradient"></div>
        <div className="skills__particles" ref={particlesRef}></div>
      </div>
      
      <h2 className="skills__heading">
        <span className="skills__heading-text">Skills & Expertise</span>
        <span className="skills__heading-line"></span>
      </h2>

      <div className="skills__groups">
        {skills.map((group, idx) => (
          <div
            key={idx}
            ref={el => groupRefs.current[idx] = el}
            className={`skills__group ${activeGroup === idx ? 'active' : ''}`}
            onMouseEnter={() => handleGroupHover(idx)}
            onMouseLeave={handleGroupLeave}
            style={{
              '--group-color': group.color,
              '--group-gradient': group.gradient,
              '--group-glow': group.glow
            }}
          >
            <div className="skills__group-header">
              <span className="skills__group-icon">{group.icon}</span>
              <h3 className="skills__group-title">{group.group}</h3>
            </div>

            <div className="skills__items">
              {group.items.map((skill, i) => (
                <div
                  key={i}
                  ref={el => skillRefs.current[skill.name] = el}
                  className={`skills__item ${selectedSkill?.name === skill.name ? 'active' : ''}`}
                  onClick={() => handleSkillClick(skill)}
                >
                  <div className="skills__item-header">
                    <span className="skills__item-icon">{skill.icon}</span>
                    <div className="skills__item-content">
                      <span className="skills__item-name">{skill.name}</span>
                      <span className="skills__item-level">{skill.level}%</span>
                    </div>
                  </div>
                  
                  <div className="skills__progress">
                    <div 
                      className="skills__progress-bar"
                      style={{ width: `${skill.level}%` }}
                    >
                      <div className="skills__progress-glow"></div>
                      <div className="skills__progress-shine"></div>
                    </div>
                  </div>

                  {selectedSkill?.name === skill.name && (
                    <div className="skills__item-description">
                      <div className="skills__item-description-content">
                        {skill.description}
                      </div>
                      <div className="skills__item-description-backdrop"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="skills__group-backdrop"></div>
            <div className="skills__group-shine"></div>
            <div className="skills__group-glow"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
