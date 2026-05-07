import { Card, Typography } from 'antd'
import { SKILL_ITEMS, SKILLS_EYEBROW, SKILLS_SECTION_ID, SKILLS_TITLE } from './const'
import { getSkillsGridClassName } from './utils'
import './style.css'

const { Title, Text } = Typography

export function MySkills() {
  const gridClassName = getSkillsGridClassName()

  return (
    <section id={SKILLS_SECTION_ID} className="skills-section">
      <div className="skills-shell">
        <header className="skills-header">
          <Text className="skills-eyebrow">{SKILLS_EYEBROW}</Text>
          <Title level={2} className="skills-title">
            {SKILLS_TITLE}
          </Title>
        </header>

        <div className={gridClassName}>
          {SKILL_ITEMS.map((skill) => (
            <Card key={skill.id} className="skill-card" bordered={false}>
              <span className="skill-icon-wrap">{skill.icon}</span>
              <p className="skill-short">{skill.shortLabel}</p>
              <Title level={5} className="skill-name">
                {skill.name}
              </Title>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
