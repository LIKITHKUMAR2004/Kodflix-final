import { useEffect, useState } from 'react'
import '../styles/Header.css'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__contents">
        <div className="header__left">
          <div className="header__logo">NETFLIX</div>
          <nav className="header__nav">
            <span className="header__navItem header__navItem--active">Home</span>
            <span className="header__navItem">TV Shows</span>
            <span className="header__navItem">Movies</span>
            <span className="header__navItem">Latest</span>
            <span className="header__navItem">My List</span>
          </nav>
        </div>
        <div className="header__right">
          <span className="header__icon">🔍</span>
          <span className="header__icon">🔔</span>
          <div className="header__avatar">U</div>
        </div>
      </div>
    </header>
  )
}

