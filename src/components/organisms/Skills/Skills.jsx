import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaReact, FaNodeJs, FaPython, FaJava, FaDocker, FaAws } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiPostgresql } from 'react-icons/si';
import './Skills.scss';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    name: 'Frontend',
    color: '#61DAFB',
    items: [
      {
        name: 'React',
        level: 95,
        icon: <FaReact />,
        description: 'Expert in React ecosystem including Next.js, Redux, and React Query'
      },
      {
        name: 'TypeScript',
        level: 90,
        icon: <SiTypescript />,
        description: 'Advanced TypeScript with focus on type safety and best practices'
      }
    ]
  },
  {
    name: 'Backend',
    color: '#68A063',
    items: [
      {
        name: 'Node.js',
        level: 92,
        icon: <FaNodeJs />,
        description: 'Building scalable APIs and real-time applications'
      },
      {
        name: 'Python',
        level: 88,
        icon: <FaPython />,
        description: 'Data processing and backend development with Django/FastAPI'
      },
      {
        name: 'Java',
        level: 85,
        icon: <FaJava />,
        description: 'Enterprise applications and microservices'
      }
    ]
  },
  {
    name: 'Infrastructure',
    color: '#2496ED',
    items: [
      {
        name: 'Docker',
        level: 88,
        icon: <FaDocker />,
        description: 'Container orchestration and deployment automation'
      },
      {
        name: 'AWS',
        level: 85,
        icon: <FaAws />,
        description: 'Cloud infrastructure and serverless architecture'
      }
    ]
  },
  {
    name: 'Database',
    color: '#4DB33D',
    items: [
      {
        name: 'MongoDB',
        level: 90,
        icon: <SiMongodb />,
        description: 'NoSQL database design and optimization'
      },
      {
        name: 'PostgreSQL',
        level: 88,
        icon: <SiPostgresql />,
        description: 'Complex queries and database optimization'
      }
    ]
  }
];

const Skills = () => {
  const [activeSkill, setActiveSkill] = useState(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const orbsRef = useRef([]);
  const animationRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const orbs = [];
    const particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;
    let hoverOrb = null;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create orbs for each skill
    const createOrbs = () => {
      orbsRef.current = [];
      skills.forEach((category, categoryIndex) => {
        category.items.forEach((skill, skillIndex) => {
          const orb = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 40,
            color: category.color,
            skill,
            category,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            targetX: canvas.width / 2,
            targetY: canvas.height / 2,
            originalRadius: 40,
            hovered: false,
            active: false,
            expandedRadius: 80,
            expandProgress: 0,
            isExpanding: false,
            isMoving: true
          };
          orbs.push(orb);
          orbsRef.current.push(orb);
        });
      });
    };

    // Draw single orb
    const drawOrb = (orb) => {
      ctx.save();
      
      // Draw orb background
      ctx.beginPath();
      const radius = orb.radius + (orb.expandedRadius - orb.radius) * orb.expandProgress;
      ctx.arc(orb.x, orb.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = orb.color;
      ctx.fill();
      ctx.closePath();

      // Draw orb content
      if (orb.expandProgress > 0.5) {
        // Draw expanded orb content
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Draw skill name
        ctx.font = 'bold 16px Arial';
        ctx.fillText(orb.skill.name, orb.x, orb.y - radius * 0.3);
        
        // Draw level
        ctx.font = '14px Arial';
        ctx.fillText(`${orb.skill.level}%`, orb.x, orb.y);
        
        // Draw progress bar
        const barWidth = radius * 1.2;
        const barHeight = 4;
        const barY = orb.y + radius * 0.2;
        
        // Background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(orb.x - barWidth/2, barY, barWidth, barHeight);
        
        // Progress
        ctx.fillStyle = 'white';
        ctx.fillRect(
          orb.x - barWidth/2,
          barY,
          barWidth * (orb.skill.level/100),
          barHeight
        );

        // Draw description
        ctx.font = '12px Arial';
        const words = orb.skill.description.split(' ');
        let line = '';
        let lineY = orb.y + radius * 0.4;
        const maxWidth = radius * 1.5;

        words.forEach(word => {
          const testLine = line + word + ' ';
          const metrics = ctx.measureText(testLine);
          
          if (metrics.width > maxWidth) {
            ctx.fillText(line, orb.x, lineY);
            line = word + ' ';
            lineY += 15;
          } else {
            line = testLine;
          }
        });
        ctx.fillText(line, orb.x, lineY);
      } else {
        // Draw regular orb content
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(orb.skill.name, orb.x, orb.y);
      }

      // Draw glow effect
      if (orb.hovered || orb.expandProgress > 0) {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, radius * 2
        );
        gradient.addColorStop(0, `${orb.color}33`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.arc(orb.x, orb.y, radius * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }

      ctx.restore();
    };

    // Draw connections between orbs
    const drawConnections = () => {
      orbs.forEach((orb1, i) => {
        orbs.forEach((orb2, j) => {
          if (i !== j && orb1.category === orb2.category) {
            const dx = orb2.x - orb1.x;
            const dy = orb2.y - orb1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 200) {
              ctx.beginPath();
              ctx.moveTo(orb1.x, orb1.y);
              ctx.lineTo(orb2.x, orb2.y);
              ctx.strokeStyle = `${orb1.color}33`;
              ctx.lineWidth = 2;
              ctx.stroke();
              ctx.closePath();
            }
          }
        });
      });
    };

    // Handle click
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      orbs.forEach(orb => {
        const dx = clickX - orb.x;
        const dy = clickY - orb.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < orb.radius) {
          // Clear any existing timeout
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          // Expand the clicked orb
          orb.isExpanding = true;
          orb.active = true;
          orb.isMoving = false;
          setActiveSkill(orb.skill);

          // Create explosion effect
          for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 2;
            const velocity = 5;
            const particle = {
              x: orb.x,
              y: orb.y,
              radius: 2,
              color: orb.color,
              vx: Math.cos(angle) * velocity,
              vy: Math.sin(angle) * velocity,
              life: 1
            };
            particles.push(particle);
          }

          // Set timeout to shrink after 4 seconds
          timeoutRef.current = setTimeout(() => {
            orb.isExpanding = false;
            orb.active = false;
            orb.isMoving = true;
            setActiveSkill(null);
          }, 4000);
        }
      });
    };

    // Handle mouse interactions
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      let foundHover = false;
      orbs.forEach(orb => {
        const dx = mouseX - orb.x;
        const dy = mouseY - orb.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < orb.radius) {
          if (!orb.hovered) {
            orb.hovered = true;
            hoverOrb = orb;
            isHovering = true;
            document.body.style.cursor = 'pointer';
          }
          foundHover = true;
        } else {
          orb.hovered = false;
        }
      });

      if (!foundHover) {
        isHovering = false;
        hoverOrb = null;
        document.body.style.cursor = 'default';
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawConnections();

      orbs.forEach(orb => {
        // Update expand progress
        if (orb.isExpanding && orb.expandProgress < 1) {
          orb.expandProgress += 0.08;
        } else if (!orb.isExpanding && orb.expandProgress > 0) {
          orb.expandProgress -= 0.08;
        }
        orb.expandProgress = Math.max(0, Math.min(1, orb.expandProgress));

        // Apply movement only if the orb is not expanded
        if (orb.isMoving) {
          if (orb.x <= orb.radius || orb.x >= canvas.width - orb.radius) orb.vx *= -1;
          if (orb.y <= orb.radius || orb.y >= canvas.height - orb.radius) orb.vy *= -1;

          orb.x += orb.vx;
          orb.y += orb.vy;

          orb.vx += (Math.random() - 0.5) * 0.1;
          orb.vy += (Math.random() - 0.5) * 0.1;

          const maxVel = 2;
          const vel = Math.sqrt(orb.vx * orb.vx + orb.vy * orb.vy);
          if (vel > maxVel) {
            orb.vx = (orb.vx / vel) * maxVel;
            orb.vy = (orb.vy / vel) * maxVel;
          }
        }

        drawOrb(orb);
      });

      // Update and draw particles
      if (particles.length > 0) {
        particles.forEach((particle, index) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.life -= 0.02;
          
          if (particle.life > 0) {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius * particle.life, 0, Math.PI * 2);
            ctx.fillStyle = `${particle.color}${Math.floor(particle.life * 255).toString(16).padStart(2, '0')}`;
            ctx.fill();
            ctx.closePath();
          } else {
            particles.splice(index, 1);
          }
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    createOrbs();
    animate();
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <section className="skills" ref={containerRef}>
      <canvas ref={canvasRef} className="skills__canvas" />
      <div className="skills__overlay">
        <h2 className="skills__title">Skills & Expertise</h2>
      </div>
    </section>
  );
};

export default Skills;
