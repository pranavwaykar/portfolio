import ProjectCard from '../ProjectCard/ProjectCard';
import { PROJECTS } from '../../../constants/projectsData';
import './Projects.scss';

const Projects = () => {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <h2>Featured Projects</h2>
        <div className="projects__grid">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 