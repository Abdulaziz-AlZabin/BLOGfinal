import styled from "@emotion/styled"
import Link from "next/link"
import Image from "next/image"
import { CONFIG } from "site.config"
import { SchemeType } from "src/types"
import { FiSun, FiMoon, FiGithub, FiLinkedin, FiMail, FiUser, FiTerminal } from "react-icons/fi"

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
  backdrop-filter: blur(16px) saturate(180%);
  background: ${({ theme }) =>
    theme.scheme === "light"
      ? "rgba(252, 252, 252, 0.85)"
      : "rgba(10, 10, 11, 0.85)"};
  border-bottom: 1px solid ${({ theme }) => 
    theme.scheme === "dark" 
      ? `${theme.colors.neon}15`
      : theme.colors.gray4};
  box-shadow: ${({ theme }) => 
    theme.scheme === "dark" 
      ? `0 0 10px rgba(0, 255, 65, 0.08)`
      : "none"};

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
    transition: all 0.3s ease;
    position: relative;

    &:hover {
      .avatar-glow {
        opacity: 0.6;
        transform: scale(1.1);
      }

      .terminal-icon {
        color: ${({ theme }) => theme.colors.primary};
        transform: rotate(10deg);
      }

      .site-name {
        color: ${({ theme }) => theme.colors.primary};
      }
    }

    .avatar-wrapper {
      position: relative;
      width: 40px;
      height: 40px;

      .avatar-glow {
        position: absolute;
        inset: -3px;
        border-radius: 50%;
        background: ${({ theme }) => 
          theme.scheme === "dark"
            ? `linear-gradient(135deg, ${theme.colors.neon}, ${theme.colors.cyber})`
            : theme.colors.primary};
        opacity: 0;
        transition: all 0.3s ease;
        filter: blur(6px);
        z-index: 0;
      }

      .avatar {
        position: relative;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid ${({ theme }) => 
          theme.scheme === "dark" 
            ? theme.colors.neon
            : theme.colors.gray4};
        z-index: 1;
      }
    }

    .logo-text {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      @media (max-width: 480px) {
        display: none;
      }

      .terminal-icon {
        width: 18px;
        height: 18px;
        color: ${({ theme }) => theme.colors.gray9};
        transition: all 0.3s ease;
      }

      .site-name {
        font-family: 'Courier New', monospace;
        letter-spacing: 0.05em;
        transition: all 0.3s ease;
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
      border-color: ${({ theme }) => 
        theme.scheme === "dark" 
          ? theme.colors.neon
          : theme.colors.primary};
      background: ${({ theme }) => 
        theme.scheme === "dark"
          ? `${theme.colors.neon}08`
          : theme.colors.gray3};
      box-shadow: ${({ theme }) => 
        theme.scheme === "dark" 
          ? `0 0 8px rgba(0, 255, 65, 0.1)`
          : "none"};
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
        border-color: ${({ theme }) => 
          theme.scheme === "dark" 
            ? theme.colors.neon
            : theme.colors.primary};
        background: ${({ theme }) => 
          theme.scheme === "dark"
            ? `${theme.colors.neon}08`
            : theme.colors.gray3};
        box-shadow: ${({ theme }) => 
          theme.scheme === "dark" 
            ? `0 0 8px rgba(0, 255, 65, 0.1)`
            : "none"};
        transform: translateY(-2px);
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
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.gray3};
    color: ${({ theme }) => theme.colors.gray11};
    transition: all 0.3s ease;
    border: 1px solid transparent;
    position: relative;

    &:hover {
      border-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.primary};
      box-shadow: ${({ theme }) => 
        theme.scheme === "dark" 
          ? `0 0 10px rgba(0, 255, 65, 0.12)`
          : "0 4px 12px rgba(99, 102, 241, 0.15)"};
      transform: translateY(-2px) rotate(20deg);
    }

    svg {
      width: 20px;
      height: 20px;
      position: relative;
      z-index: 1;
      transition: transform 0.3s ease;
    }
  }
`
