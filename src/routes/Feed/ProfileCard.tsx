import styled from "@emotion/styled"
import Image from "next/image"
import { CONFIG } from "site.config"
import { FiCalendar, FiCode, FiZap } from "react-icons/fi"

const ProfileCard: React.FC = () => {
  return (
    <StyledWrapper>
      <div className="profile-container">
        <div className="avatar-section">
          <div className="avatar-container">
            <div className="orbit-ring ring-1" />
            <div className="orbit-ring ring-2" />
            <div className="orbit-ring ring-3" />
            <div className="avatar-glow" />
            <Image
              src={CONFIG.profile.image}
              alt={CONFIG.profile.name}
              width={140}
              height={140}
              className="avatar"
              priority
            />
            <div className="status-badge">
              <FiZap />
            </div>
          </div>
        </div>

        <div className="profile-info">
          <div className="name-wrapper">
            <h1 className="name">
              <span className="bracket">{'<'}</span>
              {CONFIG.profile.name}
              <span className="bracket">{'>'}</span>
            </h1>
            <div className="glitch-overlay" aria-hidden="true">
              {CONFIG.profile.name}
            </div>
          </div>
          
          <div className="role-badge">
            <FiCode className="role-icon" />
            <span className="role">{CONFIG.profile.role}</span>
          </div>
          
          <p className="bio">
            <span className="terminal-prompt">$</span> {CONFIG.profile.bio}
          </p>

          <div className="meta">
            <div className="meta-item">
              <FiCalendar />
              <span>Since {CONFIG.since}</span>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  )
}

export default ProfileCard

const StyledWrapper = styled.div`
  .profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 700px;
    margin: 0 auto;
    padding: 2rem;
    position: relative;
  }

  .avatar-section {
    margin-bottom: 2rem;
    position: relative;
  }

  .avatar-container {
    position: relative;
    width: 140px;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;

    .orbit-ring {
      position: absolute;
      border-radius: 50%;
      border: 1px solid ${({ theme }) => theme.colors.neon};
      opacity: 0.3;
      animation: rotate 20s linear infinite;

      &.ring-1 {
        width: 160px;
        height: 160px;
        border-color: ${({ theme }) => theme.colors.neon};
        animation-duration: 15s;
      }

      &.ring-2 {
        width: 180px;
        height: 180px;
        border-color: ${({ theme }) => theme.colors.cyber};
        animation-duration: 20s;
        animation-direction: reverse;
      }

      &.ring-3 {
        width: 200px;
        height: 200px;
        border-color: ${({ theme }) => theme.colors.purple};
        animation-duration: 25s;
      }
    }

    .avatar-glow {
      position: absolute;
      inset: -8px;
      border-radius: 50%;
      background: ${({ theme }) => 
        theme.scheme === "dark"
          ? `linear-gradient(135deg, ${theme.colors.neon}, ${theme.colors.cyber}, ${theme.colors.purple})`
          : theme.colors.primary};
      opacity: ${({ theme }) => theme.scheme === "dark" ? "0.2" : "0.15"};
      filter: blur(12px);
      animation: pulse 3s ease-in-out infinite;
    }

    .avatar {
      position: relative;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid ${({ theme }) => 
        theme.scheme === "dark" 
          ? theme.colors.neon
          : theme.colors.gray4};
      box-shadow: ${({ theme }) => 
        theme.scheme === "dark" 
          ? `0 0 15px ${theme.colors.neonGlow}, inset 0 0 10px ${theme.colors.neonGlow}`
          : "0 8px 24px rgba(0, 0, 0, 0.12)"};
      z-index: 1;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }

    .status-badge {
      position: absolute;
      bottom: 5px;
      right: 5px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: ${({ theme }) => 
        theme.scheme === "dark"
          ? `linear-gradient(135deg, ${theme.colors.neon}, ${theme.colors.cyber})`
          : theme.colors.success};
      border: 3px solid ${({ theme }) => theme.colors.gray1};
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      animation: pulse 2s ease-in-out infinite;
      box-shadow: ${({ theme }) => 
        theme.scheme === "dark" 
          ? `0 0 20px ${theme.colors.neonGlow}`
          : "none"};

      svg {
        width: 16px;
        height: 16px;
        color: ${({ theme }) => theme.scheme === "dark" ? "#000" : "#fff"};
      }
    }
  }

  .profile-info {
    width: 100%;

    .name-wrapper {
      position: relative;
      margin-bottom: 1rem;

      .name {
        font-size: 2.5rem;
        font-weight: 900;
        font-family: 'Courier New', monospace;
        letter-spacing: 0.02em;
        background: ${({ theme }) => 
          theme.scheme === "dark"
            ? `linear-gradient(135deg, ${theme.colors.neon} 0%, ${theme.colors.cyber} 50%, ${theme.colors.purple} 100%)`
            : `linear-gradient(135deg, ${theme.colors.gray12} 0%, ${theme.colors.gray10} 100%)`};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        position: relative;
        display: inline-block;
        animation: glowText 2s ease-in-out infinite;

        @media (max-width: 640px) {
          font-size: 2rem;
        }

        .bracket {
          color: ${({ theme }) => 
            theme.scheme === "dark" 
              ? theme.colors.purple
              : theme.colors.primary};
          -webkit-text-fill-color: ${({ theme }) => 
            theme.scheme === "dark" 
              ? theme.colors.purple
              : theme.colors.primary};
          animation: blink 1.5s ease-in-out infinite;
        }
      }
    }

    .role-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1.25rem;
      border-radius: 9999px;
      background: ${({ theme }) => 
        theme.scheme === "dark"
          ? `${theme.colors.neon}15`
          : `${theme.colors.primary}15`};
      border: 1px solid ${({ theme }) => 
        theme.scheme === "dark" 
          ? theme.colors.neon
          : theme.colors.primary};
      margin-bottom: 1.5rem;
      box-shadow: ${({ theme }) => 
        theme.scheme === "dark" 
          ? `0 0 20px ${theme.colors.neonGlow}`
          : "none"};

      .role-icon {
        width: 16px;
        height: 16px;
        color: ${({ theme }) => 
          theme.scheme === "dark" 
            ? theme.colors.neon
            : theme.colors.primary};
        animation: spin 4s linear infinite;
      }

      .role {
        font-size: 1rem;
        font-weight: 600;
        color: ${({ theme }) => 
          theme.scheme === "dark" 
            ? theme.colors.neon
            : theme.colors.primary};
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }
    }

    .bio {
      font-size: 1.125rem;
      color: ${({ theme }) => theme.colors.gray10};
      line-height: 1.8;
      margin-bottom: 2rem;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
      font-family: 'Courier New', monospace;

      .terminal-prompt {
        color: ${({ theme }) => 
          theme.scheme === "dark" 
            ? theme.colors.cyber
            : theme.colors.primary};
        font-weight: 700;
        margin-right: 0.5rem;
      }
    }

    .meta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      flex-wrap: wrap;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 10px;
        background: ${({ theme }) => theme.colors.gray3};
        border: 1px solid ${({ theme }) => theme.colors.gray4};
        font-size: 0.9375rem;
        color: ${({ theme }) => theme.colors.gray10};

        svg {
          width: 16px;
          height: 16px;
          color: ${({ theme }) => 
            theme.scheme === "dark" 
              ? theme.colors.cyber
              : theme.colors.primary};
        }
      }
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 0.4;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.05);
    }
  }

  @keyframes glowText {
    0%, 100% {
      filter: drop-shadow(0 0 2px ${({ theme }) => theme.colors.neon});
    }
    50% {
      filter: drop-shadow(0 0 8px ${({ theme }) => theme.colors.neon});
    }
  }

  @keyframes blink {
    0%, 49%, 100% {
      opacity: 1;
    }
    50%, 99% {
      opacity: 0.3;
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
