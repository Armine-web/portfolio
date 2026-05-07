import { Card, Typography } from 'antd'
import { useState } from 'react'
import { REVIEWER_ITEMS, REVIEWERS_EYEBROW, REVIEWERS_SECTION_ID } from './const'
import { getDotClassName, shouldTruncateReviewText, truncateReviewText } from './utils'
import './style.css'

const { Text, Title, Paragraph } = Typography

export function Reviewers() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const activeReview = REVIEWER_ITEMS[activeIndex]
  const hasOverflow = shouldTruncateReviewText(activeReview.quote)
  const visibleQuote = isExpanded ? activeReview.quote : truncateReviewText(activeReview.quote)

  const handleReviewerChange = (index: number) => {
    setActiveIndex(index)
    setIsExpanded(false)
  }

  return (
    <section id={REVIEWERS_SECTION_ID} className="reviewers-section">
      <div className="reviewers-shell">
        <Text className="reviewers-eyebrow">{REVIEWERS_EYEBROW}</Text>

        <Card className="review-card" bordered={false}>
          <img src={activeReview.avatar} alt={activeReview.name} className="review-avatar" />
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
            {activeReview.name}
          </Title>
          <Text className="review-role">{activeReview.role}</Text>

          <div className="review-dots">
            {REVIEWER_ITEMS.map((review, index) => (
              <button
                key={review.id}
                type="button"
                className={getDotClassName(index === activeIndex)}
                onClick={() => handleReviewerChange(index)}
                aria-label={`Show testimonial from ${review.name}`}
              />
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
