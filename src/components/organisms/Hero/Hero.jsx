import './Hero.scss';
import Button from '../../atoms/Button/Button';

const Hero = () => (
  <section className="hero" id="hero">
    <div className="hero__content">
      <h1 className="hero__title">Hi, I'm Your Name</h1>
      <h2 className="hero__subtitle">Frontend Developer & UI Enthusiast</h2>
      <p className="hero__bio">
        I build beautiful, performant web apps with React, SASS, and modern web tech. Let's create something amazing together!
      </p>
      <Button variant="primary" size="large" onClick={() => document.getElementById('contact').scrollIntoView({behavior: 'smooth'})}>
        Contact Me
      </Button>
    </div>
    {/* Optionally add a hero image or illustration here */}
  </section>
);

export default Hero;
