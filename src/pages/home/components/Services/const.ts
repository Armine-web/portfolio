import type { ComponentType } from 'react'
import {
  CodeOutlined,
  BgColorsOutlined,
  MobileOutlined,
  DashboardOutlined,
} from '@ant-design/icons'

export const SERVICES_SECTION_ID = 'services'
export const SERVICES_EYEBROW = 'SERVICES'
export const SERVICES_TITLE = 'What I Bring To The Table'
export const SERVICES_DESCRIPTION =
  'Focused on performance and accessibility to ensure your product reaches every user perfectly.'

export type ServiceItem = {
  id: string
  title: string
  description: string
  icon: ComponentType
}

export const SERVICE_ITEMS: ServiceItem[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Custom React applications built with modern best practices and scalable architecture.',
    icon: CodeOutlined,
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Implementation',
    description:
      'Transforming complex design systems into pixel-perfect, interactive front-end code.',
    icon: BgColorsOutlined,
  },
  {
    id: 'responsive-design',
    title: 'Responsive Design',
    description:
      'Ensuring seamless experiences across all screen sizes from mobile to ultra-wide desktops.',
    icon: MobileOutlined,
  },
  {
    id: 'performance',
    title: 'Performance',
    description:
      'Optimizing load times and runtime performance for smooth, high-speed user interactions.',
    icon: DashboardOutlined,
  },
]
