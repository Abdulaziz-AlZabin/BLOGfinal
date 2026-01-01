import styled from "@emotion/styled"
import { CONFIG } from "site.config"
import { FiHeart, FiGithub } from "react-icons/fi"

const Footer: React.FC = () => {
  return (
    <StyledWrapper>
      <div className="footer-content">
        <p className="copyright">
          © {CONFIG.since} {CONFIG.profile.name}. All rights reserved.
        </p>
        <p className="made-with">
          Made with <FiHeart className="heart" /> using Next.js & Notion
        </p>
      </div>
    </StyledWrapper>
  )
}

export default Footer

const StyledWrapper = styled.footer`
  padding: 3rem 0 2rem;
  margin-top: 4rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray4};

  .footer-content {
    text-align: center;
  }

  .copyright {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.gray10};
    margin-bottom: 0.5rem;
  }

  .made-with {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.8125rem;
    color: ${({ theme }) => theme.colors.gray9};

    .heart {
      color: ${({ theme }) => theme.colors.error};
      animation: heartbeat 1.5s ease infinite;
    }

    @keyframes heartbeat {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.2);
      }
    }
  }
`
