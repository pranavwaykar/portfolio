import './styles/main.scss';
import './App.scss';
import Hero from './components/organisms/Hero/Hero';
import Experience from './components/organisms/Experience/Experience';
import Skills from './components/organisms/Skills/Skills';
import ProjectCard from './components/organisms/ProjectCard/ProjectCard';
import Contact from './components/organisms/Contact/Contact';

function App() {
  const projects = [
    {
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with React and SASS, following Atomic Design principles.',
      image: '/project1.jpg',
      technologies: ['React', 'SASS', 'Atomic Design'],
      githubUrl: 'https://github.com/yourusername/portfolio',
      liveUrl: 'https://yourportfolio.com'
    },
    {
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce platform with user authentication, product management, and payment integration.',
      image: '/project2.jpg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      githubUrl: 'https://github.com/yourusername/ecommerce',
      liveUrl: 'https://yourecommerce.com'
    }
  ];

  return (
    <>
      <Hero />
      <Experience />
      <Skills />
      <section className="projects" id="projects">
        <h2>Featured Projects</h2>
        <div className="projects__grid">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>
      <Contact />
    </>
  );
}

export default App;
