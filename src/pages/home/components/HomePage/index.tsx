import { Header } from '../../../../components/Header/index'
import { HeroIntro } from '../HeroIntro/index'
import { HeroTopBar } from '../HeroTopBar/index'
import { HeroVisual } from '../HeroVisual/index'
import { getHomePageClasses } from './utils'
import { AboutMe } from '../Aboutme/index'
import { MySkills } from '../MySkills'
import { Services } from '../Services'
import { Projects } from '../Projects'
import { Reviewers } from '../Reviewers'
import { Contact } from '../Contact'
import './style.css'

export function HomePage() {
  const [homePageClass, heroShellClass, heroGridClass] = getHomePageClasses()

  return (
    <>
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
      <AboutMe />
      <MySkills />
      <Services />
      <Projects />
      <Reviewers />
      <Contact />
    </>
  )
}
