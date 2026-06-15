import { Card, Typography } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { REVIEWER_ITEMS, REVIEWERS_SECTION_ID } from './const'
import { getDotClassName, shouldTruncateReviewText, truncateReviewText } from './utils'
import './style.css'

const { Text, Title, Paragraph } = Typography

export function Reviewers() {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const activeReview = REVIEWER_ITEMS[activeIndex]
  const activeQuote = t(`reviewers.items.${activeReview.id}.quote`)
  const activeName = t(`reviewers.items.${activeReview.id}.name`)
  const activeRole = t(`reviewers.items.${activeReview.id}.role`)
  const hasOverflow = shouldTruncateReviewText(activeQuote)
  const visibleQuote = isExpanded ? activeQuote : truncateReviewText(activeQuote)

  const handleReviewerChange = (index: number) => {
    setActiveIndex(index)
    setIsExpanded(false)
  }

  return (
    <section id={REVIEWERS_SECTION_ID} className="reviewers-section">
      <div className="reviewers-shell">
        <Text className="reviewers-eyebrow">{t('reviewers.eyebrow')}</Text>

        <Card className="review-card" bordered={false}>
          <img src={activeReview.avatar} alt={activeName} className="review-avatar" />
          <div className="review-quote-icon">„</div>
          <Paragraph className="review-quote">
            "{visibleQuote}"
            {hasOverflow && !isExpanded ? (
              <button type="button" className="review-expand-button" onClick={() => setIsExpanded(true)}>
                ...
              </button>
            ) : null}
          </Paragraph>
          <Title level={4} className="review-name">
            {activeName}
          </Title>
          <Text className="review-role">{activeRole}</Text>

          <div className="review-dots">
            {REVIEWER_ITEMS.map((review, index) => (
              <button
                key={review.id}
                type="button"
                className={getDotClassName(index === activeIndex)}
                onClick={() => handleReviewerChange(index)}
                aria-label={t('reviewers.showTestimonialAria', {
                  name: t(`reviewers.items.${review.id}.name`),
                })}
              />
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
