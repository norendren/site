import '../App.css'

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Dylan Jacoby</h1>
          <p className="hero-subtitle">Software Developer</p>
          <p className="hero-description">
            Just a guy who likes building systems
            and sometimes other things too
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn-primary">View Projects</a>
            <a href="#contact" className="btn-secondary">Get in Touch</a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">Projects</h2>

          <h3 className="subsection-title">TTRPG Tools</h3>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-header">
                <h4>Athia RPG Builder</h4>
                <span className="project-tag tag-ttrpg">TTRPG</span>
              </div>
              <p>Complete character creation tool for the Athia RPG. Build characters with guided wizards, automatic calculations, and export to PDF.</p>
              <a href="#/athia-rpg-builder" className="project-card-button">Launch Builder</a>
            </div>

            <div className="project-card">
              <div className="project-header">
                <h4>Athia Spell Crafter</h4>
                <span className="project-tag tag-ttrpg">TTRPG</span>
              </div>
              <p>Spell crafter and generator for the Athia RPG by Power Lunch Games.</p>
            </div>
          </div>

          <h3 className="subsection-title">Dev Tools</h3>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-header">
                <h4>PDF Inspector</h4>
                <span className="project-tag tag-dev">Dev Tool</span>
              </div>
              <p>Development utility for finding PDF coordinate mappings. Used internally for form-filling features.</p>
              <a href="#/pdf-inspector" className="project-card-button">Open Inspector</a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <p>
              I'm an experienced software developer passionate about creating
              high-quality applications that solve real problems.
            </p>
            <p>
              When I'm not coding professionally, I enjoy building tools for the
              tabletop gaming community and exploring new technologies.
            </p>
            <div className="skills">
              <h3>Skills & Technologies</h3>
              <div className="skills-grid">
                <span className="skill-tag">Golang</span>
                <span className="skill-tag">Terraform</span>
                <span className="skill-tag">Google Cloud Platform</span>
                <span className="skill-tag">AWS</span>
                <span className="skill-tag">k8s</span>
                <span className="skill-tag">Python</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Get in Touch</h2>
          <p className="contact-description">
            Interested in working together or have a question? Feel free to reach out.
          </p>
          <div className="contact-links">
            <a href="https://github.com/norendren" className="contact-link" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="mailto:hello@djacoby.dev" className="contact-link">
              Email
            </a>
            <a href="https://linkedin.com/in/your-profile" className="contact-link" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Dylan Jacoby. All rights reserved.</p>
      </footer>
    </>
  )
}

export default Home
