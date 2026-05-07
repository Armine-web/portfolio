import { Card, Typography } from 'antd'
import {
  SERVICE_ITEMS,
  SERVICES_DESCRIPTION,
  SERVICES_EYEBROW,
  SERVICES_SECTION_ID,
  SERVICES_TITLE,
} from './const'
import { getServicesGridClassName } from './utils'
import './style.css'

const { Title, Text, Paragraph } = Typography

export function Services() {
  const gridClassName = getServicesGridClassName()

  return (
    <section id={SERVICES_SECTION_ID} className="services-section">
      <div className="services-shell">
        <header className="services-head">
          <div>
            <Text className="services-eyebrow">{SERVICES_EYEBROW}</Text>
            <Title level={2} className="services-title">
              {SERVICES_TITLE}
            </Title>
          </div>
          <Paragraph className="services-description">{SERVICES_DESCRIPTION}</Paragraph>
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
                  {service.title}
                </Title>
                <Paragraph className="service-description">{service.description}</Paragraph>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
