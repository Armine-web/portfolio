import type { ComponentType } from 'react'
import { LinkOutlined, GithubOutlined } from '@ant-design/icons'
import kassamanImg from '../../../../assets/progects/kassaman.png';
import wine from '../../../../assets/progects/wine.png';
import delivery from '../../../../assets/progects/delivery.png';


export const PROJECTS_SECTION_ID = 'work'
export const PROJECTS_EYEBROW = 'WORK'
export const PROJECTS_TITLE = 'Featured Projects'

export type ProjectLink = {
  label: string
  href: string
  icon: ComponentType
  variant: 'primary' | 'secondary'
}

export type ProjectItem = {
  id: string
  title: string
  image: string
  tags: string[]
  links: ProjectLink[]
}

export const PROJECT_ITEMS: ProjectItem[] = [
  {
    id: 'kassaman-jewelry-shop',
    title: 'Kassaman Jewelry Shop',
    image: kassamanImg,
    tags: ['React', 'TypeScript', 'Ant Design'],
    links: [
      { label: 'Live Demo', href: 'https://kassaman.vercel.app/', icon: LinkOutlined, variant: 'primary' },
      { label: 'GitHub', href: 'https://github.com/Armine-web/kassaman', icon: GithubOutlined, variant: 'secondary' },
    ],
  },
  {
    id: 'jraghats-wines-collection',
    title: 'Jraghats Wines Collection',
    image:
      wine,
    tags: ['React', 'JavaScript', 'Ant Design'],
    links: [
      { label: 'Live Demo', href: 'https://wine-sand.vercel.app/', icon: LinkOutlined, variant: 'primary' },
      { label: 'GitHub', href: 'https://github.com/Armine-web/wine-sand', icon: GithubOutlined, variant: 'secondary' },
    ],
  },
  {
    id: 'delivery-website',
    title: 'Delivery Your food to your Home',
    image:
      delivery,
    tags: ['React', 'JavaScript'],
    links: [
      { label: 'Live Demo', href: 'https://armine-web.github.io/delivery/', icon: LinkOutlined, variant: 'primary' },
      { label: 'GitHub', href: 'https://github.com/Armine-web/delivery', icon: GithubOutlined, variant: 'secondary' },
    ],
  },
]
