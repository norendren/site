import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import CharacterGenerator from './pages/CharacterGenerator'
import PDFInspector from './pages/PDFInspector'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        {/* Navigation */}
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">DJ</Link>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <a href="#projects">Projects</a>
              <Link to="/character-generator">Character Generator</Link>
              <Link to="/pdf-inspector">PDF Inspector</Link>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character-generator" element={<CharacterGenerator />} />
          <Route path="/pdf-inspector" element={<PDFInspector />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
