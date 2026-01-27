import styled from "@emotion/styled"
import Link from "next/link"
import Image from "next/image"
import { CONFIG } from "site.config"
import { FiGithub, FiLinkedin, FiMail, FiUser } from "react-icons/fi"

export const Header = () => {
  return (
    <StyledHeader>
      <div className="header-inner">
        <Link href="/" className="logo">
          <div className="avatar-wrapper">
            <Image
              src={CONFIG.profile.image}
              alt="Logo"
              width={40}
              height={40}
              className="avatar"
            />
          </div>
          <span className="site-name">{CONFIG.blog.title}</span>
        </Link>

        <nav className="nav-actions">
          <Link href="/about" className="nav-link">
            <FiUser />
            <span>About</span>
          </Link>

          <div className="social-links">
            {CONFIG.profile.github && (
              <a
                href={`https://github.com/${CONFIG.profile.github}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="social-link"
              >
                <FiGithub />
              </a>
            )}
            {CONFIG.profile.linkedin && (
              <a
                href={`https://linkedin.com/in/${CONFIG.profile.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-link"
              >
                <FiLinkedin />
              </a>
            )}
            {CONFIG.profile.email && (
              <a
                href={`mailto:${CONFIG.profile.email}`}
                aria-label="Email"
                className="social-link"
              >
                <FiMail />
              </a>
            )}
          </div>
        </nav>
      </div>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(16px) saturate(180%);
  background: rgba(10, 10, 11, 0.85);
  border-bottom: 1px solid ${({ theme }) => `${theme.colors.neon}15`};
  box-shadow: 0 0 10px rgba(0, 255, 65, 0.08);

  .header-inner {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0.875rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
      padding: 0.75rem 1rem;
    }
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    font-weight: 600;
    font-size: 1.125rem;
    transition: opacity 0.2s ease;
    color: #ffffff;

    &:hover {
      opacity: 0.8;
    }

    .avatar-wrapper {
      position: relative;
      width: 40px;
      height: 40px;

      .avatar {
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid ${({ theme }) => theme.colors.gray4};
      }
    }

    .site-name {
      letter-spacing: -0.01em;

      @media (max-width: 480px) {
        display: none;
      }
    }
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    font-size: 0.9375rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray11};
    transition: all 0.3s ease;
    border: 1px solid transparent;
    position: relative;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.neon};
      background: ${({ theme }) => `${theme.colors.neon}08`};
      box-shadow: 0 0 8px rgba(0, 255, 65, 0.1);
    }

    svg {
      width: 18px;
      height: 18px;
      position: relative;
      z-index: 1;
    }

    span {
      position: relative;
      z-index: 1;
      
      @media (max-width: 640px) {
        display: none;
      }
    }
  }

  .social-links {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    @media (max-width: 640px) {
      display: none;
    }

    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border-radius: 10px;
      color: ${({ theme }) => theme.colors.gray10};
      transition: all 0.3s ease;
      border: 1px solid transparent;
      position: relative;

      &:hover {
        color: ${({ theme }) => theme.colors.primary};
        border-color: ${({ theme }) => theme.colors.neon};
        background: ${({ theme }) => `${theme.colors.neon}08`};
        box-shadow: 0 0 8px rgba(0, 255, 65, 0.1);
        transform: translateY(-2px);
      }

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
`
