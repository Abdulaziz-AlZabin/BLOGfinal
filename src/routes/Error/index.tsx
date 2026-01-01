import styled from "@emotion/styled"
import Link from "next/link"
import { FiHome } from "react-icons/fi"

const CustomError: React.FC = () => {
  return (
    <StyledWrapper>
      <div className="error-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-message">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="home-link">
          <FiHome />
          Go back home
        </Link>
      </div>
    </StyledWrapper>
  )
}

export default CustomError

const StyledWrapper = styled.div`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  .error-content {
    text-align: center;

    .error-code {
      font-size: 8rem;
      font-weight: 900;
      line-height: 1;
      background: linear-gradient(
        135deg,
        ${({ theme }) => theme.colors.primary},
        ${({ theme }) => theme.colors.secondary}
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 1rem;

      @media (max-width: 640px) {
        font-size: 5rem;
      }
    }

    .error-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.gray12};
      margin-bottom: 1rem;
    }

    .error-message {
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.gray10};
      margin-bottom: 2rem;
      max-width: 400px;
    }

    .home-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 1.5rem;
      border-radius: 10px;
      background: ${({ theme }) => theme.colors.primary};
      color: white;
      font-weight: 600;
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
  }
`
