import './Experience.scss';

const experiences = [
  {
    company: 'Tech Corp',
    role: 'Frontend Developer',
    duration: '2022 - Present',
    description: 'Building scalable web apps with React, SASS, and modern JS. Led UI redesign and improved performance by 30%.',
  },
  {
    company: 'Web Studio',
    role: 'UI Developer',
    duration: '2020 - 2022',
    description: 'Worked on client projects, creating responsive and accessible interfaces with React and SCSS.',
  },
];

const Experience = () => (
  <section className="experience" id="experience">
    <h2 className="experience__heading">Experience</h2>
    <div className="experience__timeline">
      {experiences.map((exp, idx) => (
        <div className="experience__item" key={idx}>
          <div className="experience__role">{exp.role}</div>
          <div className="experience__company">{exp.company}</div>
          <div className="experience__duration">{exp.duration}</div>
          <div className="experience__desc">{exp.description}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Experience;
