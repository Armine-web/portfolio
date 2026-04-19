import { HERO_GRID_CLASS, HERO_SHELL_CLASS, HOME_PAGE_CLASS } from './const'

export const getHomePageClasses = () =>
  `${HOME_PAGE_CLASS} ${HERO_SHELL_CLASS} ${HERO_GRID_CLASS}`.split(' ')
