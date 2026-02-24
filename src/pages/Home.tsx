import { useLayoutEffect } from 'react'
import '../App.css'
import { projectCategories, type TagVariant } from '../data/projects'

const tagClass: Record<TagVariant, string> = {
  default: 'project-tag',
  ttrpg: 'project-tag tag-ttrpg',
  dev: 'project-tag tag-dev',
  wip: 'project-tag tag-wip',
}

const SCROLL_KEY = 'homeScrollY'

function saveScroll() {
  sessionStorage.setItem(SCROLL_KEY, String(window.scrollY))
}

function Home() {
  useLayoutEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_KEY)
    if (saved) {
      window.scrollTo(0, parseInt(saved))
      sessionStorage.removeItem(SCROLL_KEY)
    }
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-avatar">
            <img src="/headshot.webp" alt="Dylan Jacoby" />
          </div>
          <h1 className="hero-title">Dylan Jacoby</h1>
          <p className="hero-subtitle">Senior Software Engineer</p>
          <p className="hero-description">
            Senior Developer focused on building great software and even better engineering cultures
          </p>
          <div className="hero-contact">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
            <span className="hero-contact-sep">|</span>
            <a href="mailto:me@djacoby.dev">me@djacoby.dev</a>
            <span className="hero-contact-sep">|</span>
            <a href="https://github.com/norendren" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span className="hero-contact-sep">|</span>
            <a href="https://www.linkedin.com/in/dylan-jacoby/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <div className="hero-cta">
            <button
              className="btn-primary"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
            </button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">Projects</h2>
          {projectCategories.map((category) => (
            <div key={category.title}>
              <h3 className="subsection-title">{category.title}</h3>
              <div className="projects-grid">
                {category.projects.map((project) => (
                  <div key={project.title} className="project-card">
                    <div className="project-header">
                      <h4>{project.title}</h4>
                      <div className="project-tags">
                        {project.tags.map((tag) => (
                          <span key={tag.label} className={tagClass[tag.variant ?? 'default']}>
                            {tag.label}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p>{project.description}</p>
                    {project.links && (
                      <div className="project-card-links">
                        {project.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            className="project-card-button"
                            {...(link.external
                              ? { target: '_blank', rel: 'noopener noreferrer' }
                              : { onClick: saveScroll }
                            )}
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <p>
              I'm an experienced software developer passionate about creating
              highly observable, highly scalable systems that solve real problems.
              I also love fostering a positive and empathetic engineering culture.
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
                <span className="skill-tag">GCP</span>
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
            <a href="mailto:me@djacoby.dev" className="contact-link">
              Email
            </a>
            <a href="https://www.linkedin.com/in/dylan-jacoby/" className="contact-link" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 Dylan Jacoby. All rights reserved.</p>
      </footer>
    </>
  )
}

export default Home
