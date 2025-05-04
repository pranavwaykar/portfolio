import { EXPERIENCES } from '../../../constants';
import './Experience.scss';

const Experience = () => {
  return (
    <section className="experience" id="experience">
      <div className="container">
        <h2 className="experience__heading">Experience</h2>
        <div className="experience__timeline">
          {EXPERIENCES.map((experience, index) => (
            <div key={index} className="experience__item">
              <h3 className="experience__role">{experience.role}</h3>
              <div className="experience__company">{experience.company}</div>
              <div className="experience__duration">{experience.duration}</div>
              <p className="experience__desc">{experience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
