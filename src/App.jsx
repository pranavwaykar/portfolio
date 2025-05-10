import './styles/main.scss';
import './App.scss';
import Hero from './components/organisms/Hero/Hero';
import Experience from './components/organisms/Experience/Experience';
import Skills from './components/organisms/Skills/Skills';
import Projects from './components/organisms/Projects/Projects';
import Contact from './components/organisms/Contact/Contact';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="app">
      <Navbar />
      <section id="hero">
        <Hero />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}

export default App;
