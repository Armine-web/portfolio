import { SOCIAL_LINKS } from './const'

type SocialLink = (typeof SOCIAL_LINKS)[number]

export const getSocialLinks = (): ReadonlyArray<SocialLink> => SOCIAL_LINKS
