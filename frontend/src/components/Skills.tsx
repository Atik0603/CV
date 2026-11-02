import { useSkills } from "../hooks/useSkills";
import type { Skill } from "../types/skill";
import "../styles/Skills.css";

function groupByCategory(skills: Skill[]): Record<string, Skill[]> {
  return skills.reduce<Record<string, Skill[]>>((groups, skill) => {
    if (!groups[skill.category]) {
      groups[skill.category] = [];
    }
    groups[skill.category].push(skill);
    return groups;
  }, {});
}

function Skills() {
  const skills = useSkills();

  if (skills.length === 0) return null;

  const groups = groupByCategory(skills);

  return (
    <div className="skills">
      {Object.entries(groups).map(([category, items]) => (
        <div key={category} className="skills-group">
          <h3 className="skills-category">{category}</h3>
          <ul className="skills-list">
            {items.map((skill) => (
              <li key={skill.id} className="skill-chip">
                {skill.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Skills;