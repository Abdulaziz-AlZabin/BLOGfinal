import styled from "@emotion/styled"
import Link from "next/link"
import Image from "next/image"
import { CONFIG } from "site.config"
import { SchemeType } from "src/types"
import { FiSun, FiMoon, FiGithub, FiLinkedin, FiMail, FiUser } from "react-icons/fi"

type Props = {
  scheme: SchemeType
  toggleScheme: () => void
}

export const Header = ({ scheme, toggleScheme }: Props) => {
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

          <button
            onClick={toggleScheme}
            className="theme-toggle"
            aria-label={`Switch to ${scheme === 'light' ? 'dark' : 'light'} mode`}
          >
            {scheme === "light" ? <FiMoon /> : <FiSun />}
          </button>
        </nav>
      </div>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
  background-color: ${({ theme }) =>
    theme.scheme === "light"
      ? "rgba(252, 252, 252, 0.85)"
      : "rgba(10, 10, 11, 0.85)"};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray4};

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
    gap: 0.75rem;
    font-weight: 600;
    font-size: 1.125rem;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }

    .avatar-wrapper {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;

      .avatar {
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .site-name {
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
    border-radius: 8px;
    font-size: 0.9375rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray11};
    transition: all 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.colors.gray3};
    }

    svg {
      width: 18px;
      height: 18px;
    }

    span {
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
      width: 36px;
      height: 36px;
      border-radius: 8px;
      color: ${({ theme }) => theme.colors.gray10};
      transition: all 0.2s ease;

      &:hover {
        color: ${({ theme }) => theme.colors.primary};
        background: ${({ theme }) => theme.colors.gray3};
      }

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }

  .theme-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.gray3};
    color: ${({ theme }) => theme.colors.gray11};
    transition: all 0.2s ease;

    &:hover {
      background: ${({ theme }) => theme.colors.gray4};
      color: ${({ theme }) => theme.colors.primary};
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }
`
