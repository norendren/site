import React from 'react'
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import AthiaRPGBuilder from './pages/AthiaRPGBuilder'
import PDFInspector from './pages/PDFInspector'
import './App.css'

function App() {
  // Inner component uses router hooks (must be inside Router)
  const AppContent: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const scrollToId = (id: string, e?: React.MouseEvent<HTMLAnchorElement>) => {
      e?.preventDefault()

      // If we're already on the home route, just scroll
      if (location.pathname === '/' || location.pathname === '') {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        return
      }

      // Otherwise navigate to home and pass the target id in state. The effect below
      // will perform the scroll once Home is active.
      navigate('/', { state: { scrollTo: id } })
    }

    // When navigation brings us to a location that contains a scroll target in state,
    // perform the scroll and then clear the state so it doesn't run again.
    React.useEffect(() => {
      const state = (location.state as any) || {}
      const target = state.scrollTo as string | undefined
      if (!target) return

      // small delay to allow DOM to render
      const t = setTimeout(() => {
        const el = document.getElementById(target)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }

        // replace current history entry to clear the state
        try {
          navigate(location.pathname, { replace: true, state: null })
        } catch (e) {
          // if navigate fails for any reason, fallback to replacing history state
          try { window.history.replaceState({}, '', window.location.href) } catch (_) {}
        }
      }, 50)

      return () => clearTimeout(t)
    }, [location, navigate])

    return (
      <div className="app">
        {/* Navigation */}
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">DJ</Link>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <div className="nav-dropdown">
                <span className="nav-dropdown-toggle">
                  Projects <span className="dropdown-arrow">▾</span>
                </span>
                <div className="nav-dropdown-menu">
                  <Link to="/athia-rpg-builder" className="nav-dropdown-item">Athia RPG Builder</Link>
                </div>
              </div>
              <a href="#about" onClick={(e) => scrollToId('about', e)}>About</a>
              <a href="#contact" onClick={(e) => scrollToId('contact', e)}>Contact</a>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/athia-rpg-builder" element={<AthiaRPGBuilder />} />
          <Route path="/pdf-inspector" element={<PDFInspector />} />
        </Routes>
      </div>
    )
  }

  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
