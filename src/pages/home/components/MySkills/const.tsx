import type { ReactNode } from 'react'
import {
  AntDesignOutlined,
  CodeOutlined,
  DashboardOutlined,
  DeploymentUnitOutlined,
  FileTextOutlined,
  Html5Outlined,
  LayoutOutlined,
  SketchOutlined,
} from '@ant-design/icons'

export const SKILLS_SECTION_ID = 'skills'

export type SkillItem = {
  id: string
  name: string
  shortLabel: string
  icon: ReactNode
}

export const SKILL_ITEMS: SkillItem[] = [
  { id: 'html5', name: 'HTML5', shortLabel: 'HTML', icon: <Html5Outlined /> },
  { id: 'css3', name: 'CSS3', shortLabel: 'CSS', icon: <CodeOutlined /> },
  { id: 'javascript', name: 'JavaScript', shortLabel: 'JS', icon: <FileTextOutlined /> },
  { id: 'react', name: 'React', shortLabel: 'React', icon: <DeploymentUnitOutlined /> },
  { id: 'typescript', name: 'TypeScript', shortLabel: 'TS', icon: <CodeOutlined /> },
  { id: 'redux', name: 'Redux', shortLabel: 'Redux', icon: <DashboardOutlined /> },
  { id: 'tailwind', name: 'Tailwind', shortLabel: 'TW', icon: <SketchOutlined /> },
  { id: 'ant-design', name: 'Ant Design', shortLabel: 'Ant', icon: <AntDesignOutlined /> },
  { id: 'bootstrap', name: 'Bootstrap', shortLabel: 'BS', icon: <LayoutOutlined /> },
  { id: 'material-ui', name: 'Material UI', shortLabel: 'MUI', icon: <DashboardOutlined /> },
]
