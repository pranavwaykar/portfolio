import './Skills.scss';

const skills = [
  {
    group: 'Frontend',
    items: ['React', 'JavaScript', 'HTML5', 'CSS3', 'SASS', 'TypeScript'],
  },
  {
    group: 'Backend',
    items: ['Node.js', 'Express', 'MongoDB'],
  },
  {
    group: 'Tools',
    items: ['Git', 'Figma', 'Vite', 'Jest'],
  },
];

const Skills = () => (
  <section className="skills" id="skills">
    <h2 className="skills__heading">Skills</h2>
    <div className="skills__groups">
      {skills.map((group, idx) => (
        <div className="skills__group" key={idx}>
          <div className="skills__group-title">{group.group}</div>
          <div className="skills__items">
            {group.items.map((item, i) => (
              <span className="skills__item" key={i}>{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Skills;
