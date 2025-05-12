import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaReact, FaVuejs, FaHtml5, FaCss3Alt, FaSass, 
  FaJs, FaNodeJs, FaGithub, FaGitlab, FaBootstrap 
} from 'react-icons/fa';
import { 
  SiTypescript, SiJquery, SiMongodb, SiTailwindcss, 
  SiMantine 
} from 'react-icons/si';
import './Skills.scss';

gsap.registerPlugin(ScrollTrigger);

// Professional color palette for technology groups
const colors = {
  frameworks: '#6E85B7', // Deep blue for React, Vue, HTML
  styling: '#AC87C5',    // Rich purple for CSS, SASS
  scripting: '#B4B4B8',  // Forest green for JS, TS, jQuery
  backend: '#D5F0C1',    // Warm gold for Node, MongoDB
  ui: '#AEE2FF',         // Sky blue for Tailwind, Bootstrap, Mantine
  vcs: '#F9B572'         // Slate gray for Github, Gitlab
};

const skills = [
  {
    name: 'Frontend Frameworks',
    color: colors.frameworks,
    items: [
      {
        name: 'React',
        level: 90,
        icon: <FaReact />,
        description: 'React development with Redux, Context API & Hooks'
      },
      {
        name: 'Vue',
        level: 60,
        icon: <FaVuejs />,
        description: 'Vue.js development with Vuex and Composition API'
      },
      {
        name: 'HTML5',
        level: 90,
        icon: <FaHtml5 />,
        description: 'Semantic HTML with accessibility best practices'
      }
    ]
  },
  {
    name: 'Styling',
    color: colors.styling,
    items: [
      {
        name: 'CSS3',
        level: 90,
        icon: <FaCss3Alt />,
        description: 'Advanced CSS with Flexbox, Grid, and Animations'
      },
      {
        name: 'SASS',
        level: 85,
        icon: <FaSass />,
        description: 'SASS/SCSS with mixins, functions, and architecture'
      }
    ]
  },
  {
    name: 'Scripting',
    color: colors.scripting,
    items: [
      {
        name: 'JavaScript',
        level: 85,
        icon: <FaJs />,
        description: 'JavaScript with ES6+ features & async programming'
      },
      {
        name: 'TypeScript',
        level: 70,
        icon: <SiTypescript />,
        description: 'TypeScript with advanced types and best practices'
      },
      {
        name: 'jQuery',
        level: 80,
        icon: <SiJquery />,
        description: 'jQuery for DOM manipulation and legacy systems'
      }
    ]
  },
  {
    name: 'Backend',
    color: colors.backend,
    items: [
      {
        name: 'Node.js',
        level: 65,
        icon: <FaNodeJs />,
        description: 'Node.js with Express and RESTful APIs'
      },
      // {
      //   name: 'MongoDB',
      //   level: 88,
      //   icon: <SiMongodb />,
      //   description: 'MongoDB with Mongoose ODM & aggregation pipelines'
      // }
    ]
  },
  {
    name: 'UI Frameworks',
    color: colors.ui,
    items: [
      {
        name: 'Tailwind',
        level: 70,
        icon: <SiTailwindcss />,
        description: 'Tailwind CSS with custom configurations'
      },
      {
        name: 'Bootstrap',
        level: 90,
        icon: <FaBootstrap />,
        description: 'Bootstrap with custom theming and components'
      },
      {
        name: 'Mantine',
        level: 95,
        icon: <SiMantine />,
        description: 'Mantine UI with custom hooks and components'
      }
    ]
  },
  {
    name: 'Version Control',
    color: colors.vcs,
    items: [
      {
        name: 'GitHub',
        level: 95,
        icon: <FaGithub />,
        description: 'GitHub with Actions, PR workflows, & collaboration'
      },
      {
        name: 'GitLab',
        level: 90,
        icon: <FaGitlab />,
        description: 'GitLab with CI/CD pipelines and DevOps practices'
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
      
      const radius = orb.radius + (orb.expandedRadius - orb.radius) * orb.expandProgress;
      const time = Date.now() * 0.001; // For animated effects
      
      // Create chromatic aberration effect
      const drawChromatic = (offsetX, offsetY, color) => {
        const sphereGradient = ctx.createRadialGradient(
          orb.x - radius * 0.3 + offsetX, 
          orb.y - radius * 0.3 + offsetY, 
          radius * 0.1,
          orb.x + offsetX, 
          orb.y + offsetY, 
          radius
        );
        sphereGradient.addColorStop(0, `${color}22`);
        sphereGradient.addColorStop(0.8, `${color}11`);
        sphereGradient.addColorStop(1, `${color}00`);

        ctx.beginPath();
        ctx.arc(orb.x + offsetX, orb.y + offsetY, radius, 0, Math.PI * 2);
        ctx.fillStyle = sphereGradient;
        ctx.fill();
      };

      // Draw chromatic layers
      drawChromatic(-2, -2, '#FF0000'); // Red layer
      drawChromatic(2, 2, '#0000FF');   // Blue layer

      // Main sphere with enhanced gradient
      const sphereGradient = ctx.createRadialGradient(
        orb.x - radius * 0.3, 
        orb.y - radius * 0.3, 
        radius * 0.1,
        orb.x, 
        orb.y, 
        radius
      );
      
      // Create dynamic color variations
      const baseColor = orb.color;
      const lighterColor = baseColor.replace('rgb', 'rgba').replace(')', ', 0.9)');
      const darkerColor = baseColor.replace('rgb', 'rgba').replace(')', ', 0.7)');
      
      sphereGradient.addColorStop(0, lighterColor);
      sphereGradient.addColorStop(0.5, baseColor);
      sphereGradient.addColorStop(1, darkerColor);

      // Draw main sphere with subtle animation
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGradient;
      ctx.fill();

      // Add inner glow
      const innerGlow = ctx.createRadialGradient(
        orb.x, orb.y, radius * 0.5,
        orb.x, orb.y, radius
      );
      innerGlow.addColorStop(0, 'rgba(255, 255, 255, 0)');
      innerGlow.addColorStop(0.8, `${baseColor}33`);
      innerGlow.addColorStop(1, `${baseColor}66`);
      
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = innerGlow;
      ctx.fill();

      // Enhanced depth effect
      const depthGradient = ctx.createRadialGradient(
        orb.x, orb.y + radius * 0.5, 0,
        orb.x, orb.y + radius * 0.5, radius * 1.2
      );
      depthGradient.addColorStop(0, 'rgba(0, 0, 0, 0.4)');
      depthGradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.1)');
      depthGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = depthGradient;
      ctx.fill();

      // Animated highlight effect
      const highlightAngle = time % (Math.PI * 2);
      const highlightX = orb.x + Math.cos(highlightAngle) * radius * 0.3;
      const highlightY = orb.y + Math.sin(highlightAngle) * radius * 0.3;
      
      const highlight = ctx.createRadialGradient(
        highlightX, highlightY, 0,
        highlightX, highlightY, radius * 0.8
      );
      highlight.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      highlight.addColorStop(0.1, 'rgba(255, 255, 255, 0.3)');
      highlight.addColorStop(0.2, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.arc(orb.x, orb.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = highlight;
      ctx.fill();

      // Secondary highlights
      const smallHighlight = ctx.createRadialGradient(
        orb.x + radius * 0.2, orb.y + radius * 0.2, 0,
        orb.x + radius * 0.2, orb.y + radius * 0.2, radius * 0.3
      );
      smallHighlight.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
      smallHighlight.addColorStop(0.3, 'rgba(255, 255, 255, 0.2)');
      smallHighlight.addColorStop(0.5, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.arc(orb.x, orb.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = smallHighlight;
      ctx.fill();

      // Enhanced outer glow when hovered or active
      if (orb.hovered || orb.expandProgress > 0) {
        const pulseIntensity = Math.sin(time * 4) * 0.1 + 0.9;
        const glowSize = radius * (1 + orb.expandProgress * 0.5) * pulseIntensity;
        
        const glow = ctx.createRadialGradient(
          orb.x, orb.y, radius * 0.9,
          orb.x, orb.y, glowSize
        );
        glow.addColorStop(0, `${baseColor}44`);
        glow.addColorStop(0.5, `${baseColor}22`);
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Add subtle ripple effect
        const rippleRadius = radius * (1.2 + Math.sin(time * 3) * 0.1);
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, rippleRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `${baseColor}22`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw content with enhanced styling
      if (orb.expandProgress > 0.5) {
        // Create backdrop blur effect simulation
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, radius * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fill();

        // Draw expanded orb content with enhanced styling
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Draw skill name with enhanced shadow
        ctx.font = `bold ${16 + orb.expandProgress * 4}px Arial`;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 2;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.fillText(orb.skill.name, orb.x, orb.y - radius * 0.3);
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        
        // Draw level with animation
        const levelProgress = orb.expandProgress * orb.skill.level;
        ctx.font = '14px Arial';
        ctx.fillText(`${Math.round(levelProgress)}%`, orb.x, orb.y);
        
        // Enhanced progress bar with glass effect
        const barWidth = radius * 1.2;
        const barHeight = 4;
        const barY = orb.y + radius * 0.2;
        
        // Bar background with glass effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(orb.x - barWidth/2, barY, barWidth, barHeight);
        
        // Progress bar with enhanced gradient
        const barGradient = ctx.createLinearGradient(
          orb.x - barWidth/2, barY,
          orb.x + barWidth/2, barY
        );
        barGradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        barGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.7)');
        barGradient.addColorStop(1, 'rgba(255, 255, 255, 0.95)');
        
        ctx.fillStyle = barGradient;
        ctx.fillRect(
          orb.x - barWidth/2,
          barY,
          barWidth * (levelProgress/100),
          barHeight
        );

        // Add subtle bar highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(
          orb.x - barWidth/2,
          barY,
          barWidth * (levelProgress/100),
          barHeight/2
        );

        // Draw description with enhanced text wrapping and styling
        ctx.font = '12px Arial';
        const words = orb.skill.description.split(' ');
        let line = '';
        let lineY = orb.y + radius * 0.4;
        const maxWidth = radius * 1.5;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
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
        // Draw regular orb content with enhanced styling
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 2;
        ctx.fillText(orb.skill.name, orb.x, orb.y);
        ctx.shadowColor = 'transparent';
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
        <h2 className="skills__heading">Skills & Expertise</h2>
      </div>
    </section>
  );
};

export default Skills;
