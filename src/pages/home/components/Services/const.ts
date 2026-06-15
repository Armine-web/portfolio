import type { ComponentType } from 'react'
import {
  CodeOutlined,
  BgColorsOutlined,
  MobileOutlined,
  DashboardOutlined,
} from '@ant-design/icons'

export const SERVICES_SECTION_ID = 'services'

export type ServiceItemId = 'web-development' | 'ui-ux' | 'responsive-design' | 'performance'

export type ServiceItem = {
  id: ServiceItemId
  icon: ComponentType
}

export const SERVICE_ITEMS: ServiceItem[] = [
  { id: 'web-development', icon: CodeOutlined },
  { id: 'ui-ux', icon: BgColorsOutlined },
  { id: 'responsive-design', icon: MobileOutlined },
  { id: 'performance', icon: DashboardOutlined },
]
