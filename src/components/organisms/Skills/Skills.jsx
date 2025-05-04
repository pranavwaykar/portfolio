import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { FaCode, FaDatabase, FaTools, FaCloud, FaReact, FaNodeJs, FaPython, FaJava, FaDocker, FaAws } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiPostgresql } from 'react-icons/si';
import './Skills.scss';

gsap.registerPlugin(ScrollTrigger, CustomEase);

const skills = [
  {
    title: 'Frontend Development',
    icon: <FaCode />,
    color: '#b31217',
    gradient: 'linear-gradient(135deg, #b31217, #e52d27)',
    items: [
      {
        name: 'React',
        level: 95,
        icon: <FaReact />,
        description: 'Advanced React development including hooks, context, and performance optimization'
      },
      {
        name: 'TypeScript',
        level: 90,
        icon: <SiTypescript />,
        description: 'Strong typing, interfaces, and advanced TypeScript features'
      },
      {
        name: 'Node.js',
        level: 92,
        icon: <FaNodeJs />,
        description: 'Server-side JavaScript and full-stack development'
      }
    ]
  },
  {
    title: 'Backend Development',
    icon: <FaDatabase />,
    color: '#162447',
    gradient: 'linear-gradient(135deg, #162447, #1f4068)',
    items: [
      {
        name: 'Python',
        level: 88,
        icon: <FaPython />,
        description: 'Django, FastAPI, and data processing applications'
      },
      {
        name: 'Java',
        level: 85,
        icon: <FaJava />,
        description: 'Enterprise applications and microservices'
      },
      {
        name: 'Docker',
        level: 82,
        icon: <FaDocker />,
        description: 'Containerization and deployment'
      }
    ]
  },
  {
    title: 'Database & Infrastructure',
    icon: <FaCloud />,
    color: '#4ECDC4',
    gradient: 'linear-gradient(135deg, #4ECDC4, #556270)',
    items: [
      {
        name: 'MongoDB',
        level: 85,
        icon: <SiMongodb />,
        description: 'Schema design, aggregation pipelines, and optimization'
      },
      {
        name: 'PostgreSQL',
        level: 90,
        icon: <SiPostgresql />,
        description: 'Complex queries, indexing, and performance tuning'
      },
      {
        name: 'AWS',
        level: 88,
        icon: <FaAws />,
        description: 'Cloud infrastructure and serverless architecture'
      }
    ]
  }
];

const Skills = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const groupRefs = useRef([]);
  const [activeGroup, setActiveGroup] = useState(null);
  const [activeSkill, setActiveSkill] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Groups animation
      groupRefs.current.forEach((group, index) => {
        gsap.from(group, {
          y: 100,
          opacity: 0,
          duration: 1,
          delay: index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleGroupHover = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(e.currentTarget, {
      '--x': `${x}px`,
      '--y': `${y}px`,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleGroupClick = (index) => {
    setActiveGroup(activeGroup === index ? null : index);
    setActiveSkill(null);

    const group = groupRefs.current[index];
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: group, offsetY: 100 },
      ease: 'power3.inOut'
    });
  };

  const handleSkillClick = (groupIndex, skillIndex) => {
    setActiveSkill(activeSkill === skillIndex ? null : skillIndex);
    
    const ripple = document.createElement('div');
    ripple.className = 'skills__ripple';
    const group = groupRefs.current[groupIndex];
    group.appendChild(ripple);

    gsap.to(ripple, {
      scale: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => ripple.remove()
    });
  };

  return (
    <section ref={sectionRef} className="skills">
      <div className="skills__background" />
      <div className="skills__gradient" />
      <div className="skills__particles" />
      
      <div ref={headingRef} className="skills__heading">
        <h2 className="skills__heading-text">Skills & Expertise</h2>
        <span className="skills__heading-line" />
      </div>

      <div className="skills__groups">
        {skills.map((group, groupIndex) => (
          <div
            key={group.title}
            ref={el => groupRefs.current[groupIndex] = el}
            className={`skills__group ${activeGroup === groupIndex ? 'active' : ''}`}
            style={{
              '--group-color': group.color,
              '--group-gradient': group.gradient
            }}
            onMouseMove={(e) => handleGroupHover(e, groupIndex)}
            onClick={() => handleGroupClick(groupIndex)}
          >
            <div className="skills__group-header">
              <span className="skills__group-icon" style={{ color: group.color }}>
                {group.icon}
              </span>
              <h3 className="skills__group-title">{group.title}</h3>
            </div>

            {group.items.map((skill, skillIndex) => (
              <div
                key={skill.name}
                className={`skills__item ${activeSkill === skillIndex ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSkillClick(groupIndex, skillIndex);
                }}
              >
                <div className="skills__item-header">
                  <span className="skills__item-icon" style={{ color: group.color }}>
                    {skill.icon}
                  </span>
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
                    <div className="skills__progress-glow" />
                    <div className="skills__progress-shine" />
                  </div>
                </div>

                {activeSkill === skillIndex && (
                  <div className="skills__item-description">
                    <div className="skills__item-description-backdrop" />
                    <p className="skills__item-description-content">
                      {skill.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
