import { Card, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { SERVICE_ITEMS, SERVICES_SECTION_ID } from './const'
import { getServicesGridClassName } from './utils'
import './style.css'

const { Title, Text, Paragraph } = Typography

export function Services() {
  const { t } = useTranslation()
  const gridClassName = getServicesGridClassName()

  return (
    <section id={SERVICES_SECTION_ID} className="services-section">
      <div className="services-shell">
        <header className="services-head">
          <div>
            <Text className="services-eyebrow">{t('services.eyebrow')}</Text>
            <Title level={2} className="services-title">
              {t('services.title')}
            </Title>
          </div>
          <Paragraph className="services-description">{t('services.description')}</Paragraph>
        </header>

        <div className={gridClassName}>
          {SERVICE_ITEMS.map((service) => {
            const Icon = service.icon

            return (
              <Card key={service.id} className="service-card" bordered={false}>
                <span className="service-icon-wrap">
                  <Icon />
                </span>
                <Title level={4} className="service-title">
                  {t(`services.items.${service.id}.title`)}
                </Title>
                <Paragraph className="service-description">
                  {t(`services.items.${service.id}.description`)}
                </Paragraph>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
