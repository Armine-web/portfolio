import { Header } from '../../../../components/Header/index'
import { HeroIntro } from '../HeroIntro/index'
import { HeroTopBar } from '../HeroTopBar/index'
import { HeroVisual } from '../HeroVisual/index'
import { getHomePageClasses } from './utils'
import './style.css'

export function HomePage() {
  const [homePageClass, heroShellClass, heroGridClass] = getHomePageClasses()

  return (
    <main className={homePageClass}>
      <div className={heroShellClass}>
        <HeroTopBar />
        <section id="home" className={heroGridClass}>
          <HeroIntro />
          <HeroVisual />
        </section>
      </div>
      <Header />
    </main>
  )
}
