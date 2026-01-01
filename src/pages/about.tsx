import styled from "@emotion/styled"
import Image from "next/image"
import Link from "next/link"
import { CONFIG } from "site.config"
import MetaConfig from "src/components/MetaConfig"
import { FiArrowLeft, FiGithub, FiLinkedin, FiMail, FiExternalLink } from "react-icons/fi"

const AboutPage = () => {
  const meta = {
    title: `About - ${CONFIG.blog.title}`,
    description: CONFIG.profile.bio,
    type: "website",
    url: `${CONFIG.link}/about`,
  }

  return (
    <>
      <MetaConfig {...meta} />
      <StyledWrapper>
        <Link href="/" className="back-link">
          <FiArrowLeft />
          <span>Back to home</span>
        </Link>

        <div className="about-container">
          <div className="profile-section">
            <div className="avatar-wrapper">
              <Image
                src={CONFIG.profile.image}
                alt={CONFIG.profile.name}
                width={150}
                height={150}
                className="avatar"
                priority
              />
            </div>
            <h1 className="name">{CONFIG.profile.name}</h1>
            <p className="role">{CONFIG.profile.role}</p>
            
            <div className="social-links">
              {CONFIG.profile.github && (
                <a
                  href={`https://github.com/${CONFIG.profile.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <FiGithub />
                  <span>GitHub</span>
                </a>
              )}
              {CONFIG.profile.linkedin && (
                <a
                  href={`https://linkedin.com/in/${CONFIG.profile.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <FiLinkedin />
                  <span>LinkedIn</span>
                </a>
              )}
              {CONFIG.profile.email && (
                <a
                  href={`mailto:${CONFIG.profile.email}`}
                  className="social-link"
                >
                  <FiMail />
                  <span>Email</span>
                </a>
              )}
            </div>
          </div>

          <div className="content-section">
            <section className="about-section">
              <h2>About Me</h2>
              <p>{CONFIG.profile.bio}</p>
              <p>
                Welcome to my corner of the internet! I&apos;m passionate about cybersecurity, 
                constantly exploring the ever-evolving landscape of digital threats and defenses. 
                This blog is where I share my insights, research, and experiences in the field.
              </p>
              <p>
                Whether you&apos;re a fellow security enthusiast, a curious learner, or just stumbled 
                upon this site, I hope you find something valuable here. Feel free to reach out 
                if you&apos;d like to connect or collaborate!
              </p>
            </section>

            <section className="about-section">
              <h2>What I Do</h2>
              <div className="skills-grid">
                <div className="skill-card">
                  <div className="skill-icon">🔒</div>
                  <h3>Security Research</h3>
                  <p>Exploring vulnerabilities, analyzing malware, and understanding attack vectors.</p>
                </div>
                <div className="skill-card">
                  <div className="skill-icon">🛡️</div>
                  <h3>Threat Intelligence</h3>
                  <p>Gathering and analyzing data to identify and mitigate potential threats.</p>
                </div>
                <div className="skill-card">
                  <div className="skill-icon">💻</div>
                  <h3>Security Operations</h3>
                  <p>Building and maintaining secure systems and incident response procedures.</p>
                </div>
                <div className="skill-card">
                  <div className="skill-icon">📝</div>
                  <h3>Technical Writing</h3>
                  <p>Sharing knowledge through detailed blog posts and documentation.</p>
                </div>
              </div>
            </section>

            {CONFIG.projects && CONFIG.projects.length > 0 && (
              <section className="about-section">
                <h2>Projects</h2>
                <div className="projects-list">
                  {CONFIG.projects.map((project, index) => (
                    <a
                      key={index}
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card"
                    >
                      <span className="project-name">{project.name}</span>
                      <FiExternalLink className="project-icon" />
                    </a>
                  ))}
                </div>
              </section>
            )}

            <section className="about-section">
              <h2>Get In Touch</h2>
              <p>
                Have questions, ideas, or just want to say hi? I'm always open to connecting 
                with like-minded individuals. Feel free to reach out through any of the 
                platforms above or send me an email directly.
              </p>
              {CONFIG.profile.email && (
                <a href={`mailto:${CONFIG.profile.email}`} className="contact-btn">
                  <FiMail />
                  Send me an email
                </a>
              )}
            </section>
          </div>
        </div>
      </StyledWrapper>
    </>
  )
}

export default AboutPage

const StyledWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 0 4rem;

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray10};
    background: ${({ theme }) => theme.colors.gray3};
    margin-bottom: 2rem;
    transition: all 0.2s ease;

    &:hover {
      background: ${({ theme }) => theme.colors.gray4};
      color: ${({ theme }) => theme.colors.primary};
    }

    svg {
      width: 16px;
      height: 16px;
    }
  }

  .about-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .profile-section {
    text-align: center;
    padding: 2rem;
    background: ${({ theme }) => theme.colors.gray2};
    border-radius: 20px;
    border: 1px solid ${({ theme }) => theme.colors.gray4};

    .avatar-wrapper {
      margin-bottom: 1.5rem;

      .avatar {
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .name {
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
      color: ${({ theme }) => theme.colors.gray12};
    }

    .role {
      font-size: 1.125rem;
      color: ${({ theme }) => theme.colors.primary};
      font-weight: 500;
      margin-bottom: 1.5rem;
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;

      .social-link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        border-radius: 10px;
        background: ${({ theme }) => theme.colors.gray3};
        color: ${({ theme }) => theme.colors.gray11};
        font-size: 0.9375rem;
        font-weight: 500;
        transition: all 0.2s ease;

        &:hover {
          background: ${({ theme }) => theme.colors.primary};
          color: white;
        }

        svg {
          width: 18px;
          height: 18px;
        }
      }
    }
  }

  .content-section {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .about-section {
    h2 {
      font-size: 1.5rem;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.gray12};
      margin-bottom: 1.25rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
      display: inline-block;
    }

    p {
      font-size: 1rem;
      line-height: 1.8;
      color: ${({ theme }) => theme.colors.gray11};
      margin-bottom: 1rem;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.25rem;
    margin-top: 1rem;

    .skill-card {
      padding: 1.5rem;
      background: ${({ theme }) => theme.colors.gray2};
      border-radius: 12px;
      border: 1px solid ${({ theme }) => theme.colors.gray4};
      transition: all 0.2s ease;

      &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
        transform: translateY(-2px);
      }

      .skill-icon {
        font-size: 2rem;
        margin-bottom: 0.75rem;
      }

      h3 {
        font-size: 1rem;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.gray12};
        margin-bottom: 0.5rem;
      }

      p {
        font-size: 0.875rem;
        color: ${({ theme }) => theme.colors.gray10};
        line-height: 1.5;
        margin-bottom: 0;
      }
    }
  }

  .projects-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1rem;

    .project-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.25rem;
      background: ${({ theme }) => theme.colors.gray2};
      border-radius: 10px;
      border: 1px solid ${({ theme }) => theme.colors.gray4};
      transition: all 0.2s ease;

      &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
        background: ${({ theme }) => theme.colors.gray3};

        .project-icon {
          color: ${({ theme }) => theme.colors.primary};
        }
      }

      .project-name {
        font-weight: 500;
        color: ${({ theme }) => theme.colors.gray12};
      }

      .project-icon {
        width: 18px;
        height: 18px;
        color: ${({ theme }) => theme.colors.gray8};
        transition: color 0.2s ease;
      }
    }
  }

  .contact-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.5rem;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    font-weight: 600;
    margin-top: 1rem;
    transition: all 0.2s ease;

    &:hover {
      background: ${({ theme }) => theme.colors.primaryHover};
      transform: translateY(-2px);
    }

    svg {
      width: 18px;
      height: 18px;
    }
  }
`
