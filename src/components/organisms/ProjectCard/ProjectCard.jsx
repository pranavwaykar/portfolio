import PropTypes from 'prop-types';
import Card from '../../molecules/Card/Card';
import Button from '../../atoms/Button/Button';
import './ProjectCard.scss';

const ProjectCard = ({ 
  title, 
  description, 
  image, 
  technologies = [], 
  githubUrl, 
  liveUrl 
}) => {
  return (
    <Card 
      title={title}
      description={description}
      image={image}
      className="project-card"
    >
      <div className="project-card__technologies">
        {technologies.map((tech, index) => (
          <span key={index} className="project-card__tech">
            {tech}
          </span>
        ))}
      </div>
      <div className="project-card__actions">
        {githubUrl && (
          <Button 
            variant="secondary" 
            size="small"
            onClick={() => window.open(githubUrl, '_blank')}
          >
            View Code
          </Button>
        )}
        {liveUrl && (
          <Button 
            variant="primary" 
            size="small"
            onClick={() => window.open(liveUrl, '_blank')}
          >
            Live Demo
          </Button>
        )}
      </div>
    </Card>
  );
};

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string),
  githubUrl: PropTypes.string,
  liveUrl: PropTypes.string,
};

export default ProjectCard; 