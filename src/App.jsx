import './styles/main.scss';
import './App.scss';
import Hero from './components/organisms/Hero/Hero';
import Experience from './components/organisms/Experience/Experience';
import Skills from './components/organisms/Skills/Skills';
import Projects from './components/organisms/Projects/Projects';
import Contact from './components/organisms/Contact/Contact';

function App() {
  return (
    <>
      <Hero />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}

export default App;
