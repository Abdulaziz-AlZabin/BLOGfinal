import styled from "@emotion/styled"
import { CONFIG } from "site.config"
import { FiHeart } from "react-icons/fi"

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <StyledWrapper>
      <div className="footer-divider" />
      
      <div className="footer-content">
        <p className="copyright">
          {CONFIG.profile.name} © {CONFIG.since}-{currentYear}
        </p>

        <div className="made-with">
          <span>Crafted with</span>
          <FiHeart className="heart" />
        </div>
      </div>
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
    background: ${({ theme }) => theme.colors.gray4};
    margin-bottom: 2rem;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;

    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
    }
  }

  .copyright {
    font-size: 0.875rem;
    color: ${({ theme }) => 
      theme.scheme === "dark" 
        ? theme.colors.gray10 
        : theme.colors.gray10};
  }

  .made-with {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: ${({ theme }) => 
      theme.scheme === "dark" 
        ? theme.colors.gray9 
        : theme.colors.gray9};

    .heart {
      color: ${({ theme }) => theme.colors.error};
      animation: heartbeat 1.5s ease infinite;
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
`
