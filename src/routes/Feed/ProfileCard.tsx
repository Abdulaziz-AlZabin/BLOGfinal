import styled from "@emotion/styled"
import Image from "next/image"
import { CONFIG } from "site.config"
import { FiMapPin, FiCalendar } from "react-icons/fi"

const ProfileCard: React.FC = () => {
  return (
    <StyledWrapper>
      <div className="avatar-container">
        <div className="avatar-ring">
          <Image
            src={CONFIG.profile.image}
            alt={CONFIG.profile.name}
            width={120}
            height={120}
            className="avatar"
            priority
          />
        </div>
        <div className="status-badge" />
      </div>

      <div className="profile-info">
        <h1 className="name">{CONFIG.profile.name}</h1>
        <p className="role">{CONFIG.profile.role}</p>
        <p className="bio">{CONFIG.profile.bio}</p>

        <div className="meta">
          <span className="meta-item">
            <FiCalendar />
            Since {CONFIG.since}
          </span>
        </div>
      </div>
    </StyledWrapper>
  )
}

export default ProfileCard

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;

  .avatar-container {
    position: relative;
    margin-bottom: 1.5rem;

    .avatar-ring {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;

      .avatar {
        border-radius: 50%;
        object-fit: cover;
        background: ${({ theme }) => theme.colors.gray1};
      }
    }

    .status-badge {
      position: absolute;
      bottom: 8px;
      right: 8px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.success};
      border: 3px solid ${({ theme }) => theme.colors.gray1};
    }
  }

  .profile-info {
    .name {
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
      background: linear-gradient(
        135deg,
        ${({ theme }) => theme.colors.gray12} 0%,
        ${({ theme }) => theme.colors.gray10} 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;

      @media (max-width: 640px) {
        font-size: 1.75rem;
      }
    }

    .role {
      font-size: 1.125rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.primary};
      margin-bottom: 1rem;
    }

    .bio {
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.gray10};
      line-height: 1.7;
      margin-bottom: 1.5rem;
      max-width: 450px;
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
        font-size: 0.875rem;
        color: ${({ theme }) => theme.colors.gray9};

        svg {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
`
