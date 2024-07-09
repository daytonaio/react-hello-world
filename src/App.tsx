import { useEffect, useState } from 'react'
import classNames from 'classnames'
import DaytonaLogo from './assets/daytona.svg?react'
import GitHubLogo from './assets/github.svg?react'
import HeroBackground from './assets/hero-background.svg?react'
import './App.scss'

function App() {
  const [heroBackgroundActive, setHeroBackgroundActive] = useState<boolean>(false)

  useEffect(() => {
    setHeroBackgroundActive(true)
  }, [])

  const [stargazers, setStargazers] = useState<number | null | undefined>(undefined)

  useEffect(() => {
    const storedStargazers = sessionStorage.getItem('stargazers')
    if (!storedStargazers || isNaN(Number(storedStargazers))) {
      fetch('https://api.github.com/repos/daytonaio/daytona')
        .then((response) => response.json())
        .then((data) => {
          setStargazers(data.stargazers_count)
          sessionStorage.setItem('stargazers', String(data.stargazers_count))
        })
        .catch((error) => {
          console.error(error)
          setStargazers(null)
        })
    } else {
      setStargazers(Number(storedStargazers))
    }
  }, [])

  return (
    <>
      <header className="header">
        <a href="https:/www.daytona.io" target="_blank" className="daytona-logo">
          <DaytonaLogo />
        </a>
        <a href="https://github.com/daytonaio/daytona" target="_blank" rel="noreferrer" className="github-stars">
          <GitHubLogo />
          {stargazers === undefined
            ? ''
            : stargazers === null
            ? 'Star'
            : new Intl.NumberFormat('en-US', {
                notation: 'compact',
                maximumFractionDigits: 1,
              }).format(stargazers)}
        </a>
      </header>
      <div className="hero">
        <div
          className={classNames('hero-background', {
            'hero-background--active': heroBackgroundActive,
          })}
        >
          <HeroBackground />
        </div>
        <div className="hero-content">
          <div className="hero-content-blur"></div>
          <h1 className="hero-content-title">Hello World</h1>
          <p className="hero-content-description">
            Daytona is a self-hosted and secure open source development environment manager.
          </p>
        </div>
      </div>
    </>
  )
}

export default App
