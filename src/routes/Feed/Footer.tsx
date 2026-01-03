import styled from "@emotion/styled"
import { CONFIG } from "site.config"
import { FiHeart, FiTerminal, FiCode } from "react-icons/fi"

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <StyledWrapper>
      <div className="footer-divider" />
      
      <div className="footer-content">
        <div className="footer-section">
          <div className="terminal-line">
            <FiTerminal className="terminal-icon" />
            <span className="prompt">$</span>
            <span className="command">whoami</span>
          </div>
          <p className="copyright">
            <span className="bracket">{'['}</span>
            {CONFIG.profile.name}
            <span className="bracket">{']'}</span>
            {' '}© {CONFIG.since}-{currentYear}
          </p>
        </div>

        <div className="footer-section">
          <div className="made-with">
            <FiCode className="code-icon" />
            <span>Crafted with</span>
            <FiHeart className="heart" />
            <span>using Next.js & Notion</span>
          </div>
          <div className="tech-stack">
            <span className="tech-badge">TypeScript</span>
            <span className="tech-badge">React</span>
            <span className="tech-badge">Emotion</span>
          </div>
        </div>
      </div>

      <div className="footer-glow" />
    </StyledWrapper>
  )
}

export default Footer

const StyledWrapper = styled.footer`
  padding: 3rem 0 2rem;
  margin-top: 5rem;
  position: relative;

  .footer-divider {
    width: 100%;
    height: 1px;
    background: ${({ theme }) => 
      theme.scheme === "dark"
        ? `linear-gradient(90deg, transparent, ${theme.colors.neon}, ${theme.colors.cyber}, transparent)`
        : `linear-gradient(90deg, transparent, ${theme.colors.gray4}, transparent)`};
    margin-bottom: 2rem;
    box-shadow: ${({ theme }) => 
      theme.scheme === "dark" 
        ? `0 0 10px ${theme.colors.neonGlow}`
        : "none"};
  }

  .footer-glow {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    height: 100px;
    background: ${({ theme }) => 
      theme.scheme === "dark"
        ? `radial-gradient(ellipse, ${theme.colors.neon}15, transparent 70%)`
        : "transparent"};
    pointer-events: none;
    filter: blur(40px);
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
    }
  }

  .footer-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .terminal-line {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Courier New', monospace;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.gray9};
    margin-bottom: 0.25rem;

    .terminal-icon {
      width: 14px;
      height: 14px;
      color: ${({ theme }) => 
        theme.scheme === "dark" 
          ? theme.colors.cyber
          : theme.colors.primary};
    }

    .prompt {
      color: ${({ theme }) => 
        theme.scheme === "dark" 
          ? theme.colors.neon
          : theme.colors.primary};
      font-weight: 700;
    }

    .command {
      color: ${({ theme }) => theme.colors.gray10};
    }
  }

  .copyright {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.gray10};
    font-family: 'Courier New', monospace;

    .bracket {
      color: ${({ theme }) => 
        theme.scheme === "dark" 
          ? theme.colors.purple
          : theme.colors.primary};
      font-weight: 700;
    }
  }

  .made-with {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.gray9};

    @media (max-width: 768px) {
      justify-content: center;
    }

    .code-icon {
      width: 16px;
      height: 16px;
      color: ${({ theme }) => 
        theme.scheme === "dark" 
          ? theme.colors.cyber
          : theme.colors.primary};
      animation: spin 8s linear infinite;
    }

    .heart {
      color: ${({ theme }) => theme.colors.error};
      animation: heartbeat 1.5s ease infinite;
      filter: ${({ theme }) => 
        theme.scheme === "dark" 
          ? `drop-shadow(0 0 4px ${theme.colors.error})`
          : "none"};
    }
  }

  .tech-stack {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 0.25rem;

    @media (max-width: 768px) {
      justify-content: center;
    }

    .tech-badge {
      padding: 0.25rem 0.625rem;
      border-radius: 6px;
      font-size: 0.75rem;
      font-family: 'Courier New', monospace;
      background: ${({ theme }) => theme.colors.gray3};
      color: ${({ theme }) => theme.colors.gray10};
      border: 1px solid ${({ theme }) => theme.colors.gray4};
      transition: all 0.3s ease;

      &:hover {
        border-color: ${({ theme }) => 
          theme.scheme === "dark" 
            ? theme.colors.neon
            : theme.colors.primary};
        color: ${({ theme }) => 
          theme.scheme === "dark" 
            ? theme.colors.neon
            : theme.colors.primary};
        box-shadow: ${({ theme }) => 
          theme.scheme === "dark" 
            ? `0 0 10px ${theme.colors.neonGlow}`
            : "0 2px 8px rgba(0, 0, 0, 0.1)"};
        transform: translateY(-2px);
      }
    }
  }

  @keyframes heartbeat {
    0%, 100% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.2);
    }
    50% {
      transform: scale(1);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
