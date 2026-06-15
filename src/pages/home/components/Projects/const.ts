import type { ComponentType } from 'react'
import { LinkOutlined, GithubOutlined } from '@ant-design/icons'
import kassamanImg from '../../../../assets/progects/kassaman.png'
import wine from '../../../../assets/progects/wine.png'
import delivery from '../../../../assets/progects/delivery.png'

export const PROJECTS_SECTION_ID = 'work'

export type ProjectItemId = 'kassaman-jewelry-shop' | 'jraghats-wines-collection' | 'delivery-website'

export type ProjectLink = {
  labelKey: 'liveDemo' | 'github'
  href: string
  icon: ComponentType
  variant: 'primary' | 'secondary'
}

export type ProjectItem = {
  id: ProjectItemId
  image: string
  tags: string[]
  links: ProjectLink[]
}

export const PROJECT_ITEMS: ProjectItem[] = [
  {
    id: 'kassaman-jewelry-shop',
    image: kassamanImg,
    tags: ['React', 'TypeScript', 'Ant Design'],
    links: [
      {
        labelKey: 'liveDemo',
        href: 'https://kassaman.vercel.app/',
        icon: LinkOutlined,
        variant: 'primary',
      },
      {
        labelKey: 'github',
        href: 'https://github.com/Armine-web/kassaman',
        icon: GithubOutlined,
        variant: 'secondary',
      },
    ],
  },
  {
    id: 'jraghats-wines-collection',
    image: wine,
    tags: ['React', 'JavaScript', 'Ant Design'],
    links: [
      {
        labelKey: 'liveDemo',
        href: 'https://wine-sand.vercel.app/',
        icon: LinkOutlined,
        variant: 'primary',
      },
      {
        labelKey: 'github',
        href: 'https://github.com/Armine-web/wine-sand',
        icon: GithubOutlined,
        variant: 'secondary',
      },
    ],
  },
  {
    id: 'delivery-website',
    image: delivery,
    tags: ['React', 'JavaScript'],
    links: [
      {
        labelKey: 'liveDemo',
        href: 'https://armine-web.github.io/delivery/',
        icon: LinkOutlined,
        variant: 'primary',
      },
      {
        labelKey: 'github',
        href: 'https://github.com/Armine-web/delivery',
        icon: GithubOutlined,
        variant: 'secondary',
      },
    ],
  },
]
