export function getDotClassName(isActive: boolean) {
  return isActive ? 'review-dot review-dot-active' : 'review-dot'
}

export function truncateReviewText(text: string, maxWords = 15) {
  const words = text.trim().split(/\s+/)

  if (words.length <= maxWords) {
    return text.trim()
  }

  return `${words.slice(0, maxWords).join(' ')}`
}

export function shouldTruncateReviewText(text: string, maxWords = 17) {
  return text.trim().split(/\s+/).length > maxWords
}
