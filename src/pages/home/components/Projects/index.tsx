import { Button, Card, Tag, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { PROJECT_ITEMS, PROJECTS_SECTION_ID } from './const'
import { getProjectsGridClassName } from './utils'
import './style.css'

const { Text, Title } = Typography

export function Projects() {
  const { t } = useTranslation()
  const gridClassName = getProjectsGridClassName()

  return (
    <section id={PROJECTS_SECTION_ID} className="projects-section">
      <div className="projects-shell">
        <header className="projects-header">
          <Text className="projects-eyebrow">{t('projects.eyebrow')}</Text>
          <Title level={2} className="projects-title">
            {t('projects.title')}
          </Title>
        </header>

        <div className={gridClassName}>
          {PROJECT_ITEMS.map((project) => (
            <Card key={project.id} className="project-card" bordered={false}>
              <img
                src={project.image}
                alt={t(`projects.items.${project.id}.title`)}
                className="project-image"
              />
              <div className="project-content">
                <Title level={4} className="project-name">
                  {t(`projects.items.${project.id}.title`)}
                </Title>

                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <Tag key={tag} className="project-tag">
                      {tag}
                    </Tag>
                  ))}
                </div>

                <div className="project-actions">
                  {project.links.map((link) => {
                    const Icon = link.icon
                    const buttonClassName =
                      link.variant === 'primary'
                        ? 'project-link project-link-primary'
                        : 'project-link project-link-secondary'

                    return (
                      <Button
                        key={link.variant}
                        className={buttonClassName}
                        icon={<Icon />}
                        href={link.href}
                        target="_blank"
                      >
                        {t(`projects.${link.labelKey}`)}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
