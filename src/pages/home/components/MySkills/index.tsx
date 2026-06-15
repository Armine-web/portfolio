import { Card, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { SKILL_ITEMS, SKILLS_SECTION_ID } from './const'
import { getSkillsGridClassName } from './utils'
import './style.css'

const { Title, Text } = Typography

export function MySkills() {
  const { t } = useTranslation()
  const gridClassName = getSkillsGridClassName()

  return (
    <section id={SKILLS_SECTION_ID} className="skills-section">
      <div className="skills-shell">
        <header className="skills-header">
          <Text className="skills-eyebrow">{t('skills.eyebrow')}</Text>
          <Title level={2} className="skills-title">
            {t('skills.title')}
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
