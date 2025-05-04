import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Hero.scss';
import Button from '../../atoms/Button/Button';

const subtitleTexts = [
  'Frontend Developer',
  'UI Enthusiast',
  'React & SASS Specialist',
];

const socials = [
  {
    href: 'https://github.com/pranavwaykar',
    label: 'GitHub',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#2c3e50" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.49 2.87 8.3 6.84 9.64.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"/></svg>
    ),
  },
  {
    href: 'https://linkedin.com/in/pranavwaykar',
    label: 'LinkedIn',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#3498db" d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
    ),
  },
  {
    href: 'mailto:your@email.com',
    label: 'Email',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#e74c3c" d="M12 13.065 2.4 6.6A2 2 0 0 1 4 4h16a2 2 0 0 1 1.6 2.6l-9.6 6.465Zm9.6-4.53V18a2 2 0 0 1-2 2H4.4a2 2 0 0 1-2-2V8.535l9.6 6.465 9.6-6.465Z"/></svg>
    ),
  },
];

function useTypewriter(texts, speed = 80, pause = 1200) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const timeout = useRef();

  useEffect(() => {
    const current = texts[index];
    if (!deleting && displayed.length < current.length) {
      timeout.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), speed);
    } else if (deleting && displayed.length > 0) {
      timeout.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), speed / 2);
    } else if (!deleting && displayed.length === current.length) {
      timeout.current = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((index + 1) % texts.length);
    }
    return () => clearTimeout(timeout.current);
  }, [displayed, deleting, index, texts, speed, pause]);

  return displayed;
}

const Hero = () => {
  const subtitle = useTypewriter(subtitleTexts);
  const borderRef = useRef(null);
  const imageRef = useRef(null);
  const rippleRef = useRef(null);
  const pulseTween = useRef(null);
  const colorTween = useRef(null);

  // GSAP animation on mount
  useEffect(() => {
    gsap.fromTo(
      borderRef.current,
      { scale: 0.7, boxShadow: '0 0 0 0 rgba(52,152,219,0.0)' },
      { scale: 1, boxShadow: '0 0 32px 8px rgba(52,152,219,0.15)', duration: 1.2, ease: 'elastic.out(1, 0.6)' }
    );
    gsap.fromTo(
      imageRef.current,
      { scale: 0.7, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, delay: 0.2, ease: 'elastic.out(1, 0.6)' }
    );
    // Pulse ripple animation
    pulseTween.current = gsap.to(rippleRef.current, {
      scale: 2.2,
      opacity: 0,
      repeat: -1,
      duration: 1.8,
      ease: 'power1.out',
      yoyo: false,
      delay: 0.2,
      onRepeat: () => {
        gsap.set(rippleRef.current, { scale: 1, opacity: 0.5 });
      }
    });
    return () => {
      pulseTween.current && pulseTween.current.kill();
      colorTween.current && colorTween.current.kill();
    };
  }, []);

  // On hover: speed up pulse, shift border color, scale image
  useEffect(() => {
    const border = borderRef.current;
    const ripple = rippleRef.current;
    const img = imageRef.current;
    const handleEnter = () => {
      pulseTween.current && pulseTween.current.timeScale(2.2);
      colorTween.current = gsap.to(border, {
        background: 'conic-gradient(#162447 0deg 60deg, #1a2240 75deg, #23214a 90deg, #3a1a3a 110deg, #531012 130deg, #7a1a2c 150deg,rgb(125, 2, 6) 180deg 360deg)',
        duration: 0.7,
        ease: 'power1.inOut',
      });
      gsap.to(img, { scale: 1.08, boxShadow: '0 0 32px 8px rgba(52,152,219,0.18)', duration: 0.4, ease: 'power2.out' });
    };
    const handleLeave = () => {
      pulseTween.current && pulseTween.current.timeScale(1);
      colorTween.current && colorTween.current.reverse();
      gsap.to(img, { scale: 1, boxShadow: '0 0 0 0 rgba(52,152,219,0.0)', duration: 0.6, ease: 'elastic.out(1,0.5)' });
    };
    border.addEventListener('mouseenter', handleEnter);
    border.addEventListener('mouseleave', handleLeave);
    return () => {
      border.removeEventListener('mouseenter', handleEnter);
      border.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <section className="hero fade-in" id="hero">
      <div className="hero__wrapper">
        <div className="hero__image-container animated-border" ref={borderRef}>
          <div className="hero__ripple" ref={rippleRef}></div>
          <div className="hero__inner-ring">
            <img
              className="hero__image"
              ref={imageRef}
              src="https://media.licdn.com/dms/image/v2/D4D03AQE5evBJbAI31Q/profile-displayphoto-shrink_400_400/B4DZU1.lpWG8Ag-/0/1740367354901?e=1752105600&v=beta&t=h8j2I0h4KbvV6IlYO5GuRPYlHWNdnCJNqZwK4X7yA6M"
              alt="Your Name"
            />
          </div>
        </div>
        <div className="hero__content">
          <h1 className="hero__title">Hi, I'm <span className="hero__highlight">Your Name</span></h1>
          <h2 className="hero__subtitle">
            <span className="typewriter">{subtitle}</span>
            <span className="typewriter-cursor">|</span>
          </h2>
          <p className="hero__bio">
            I build beautiful, performant web apps with <b>React</b>, <b>SASS</b>, and modern web tech.<br />Let's create something amazing together!
          </p>
          <Button variant="primary" size="large" onClick={() => document.getElementById('contact').scrollIntoView({behavior: 'smooth'})}>
            Contact Me
          </Button>
          <div className="hero__socials">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="hero__social-link"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
