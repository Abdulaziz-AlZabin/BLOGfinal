import styled from "@emotion/styled"
import Image from "next/image"
import { CONFIG } from "site.config"
import { FiShield } from "react-icons/fi"

const ProfileCard: React.FC = () => {
  return (
    <StyledWrapper>
      <div className="profile-container">
        <div className="avatar-section">
          <div className="avatar-container">
            <Image
              src={CONFIG.profile.image}
              alt={CONFIG.profile.name}
              width={140}
              height={140}
              className="avatar"
              priority
            />
          </div>
        </div>

        <div className="profile-info">
          <h1 className="name">{CONFIG.profile.name}</h1>
          
          <div className="role-badge">
            <FiShield className="role-icon" />
            <span className="role">{CONFIG.profile.role}</span>
          </div>
          
          <p className="bio">{CONFIG.profile.bio}</p>
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

    .avatar {
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid ${({ theme }) => 
        theme.scheme === "dark" 
          ? theme.colors.primary 
          : theme.colors.gray4};
      box-shadow: ${({ theme }) => 
        theme.scheme === "dark" 
          ? `0 0 20px ${theme.colors.primary}40` 
          : "0 8px 24px rgba(0, 0, 0, 0.15)"};
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: scale(1.02);
        box-shadow: ${({ theme }) => 
          theme.scheme === "dark" 
            ? `0 0 30px ${theme.colors.primary}60` 
            : "0 12px 32px rgba(0, 0, 0, 0.2)"};
      }
    }
  }

  .profile-info {
    width: 100%;

    .name {
      font-size: 2.5rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: ${({ theme }) => 
        theme.scheme === "dark" 
          ? "#ffffff" 
          : theme.colors.gray12};
      margin-bottom: 1rem;

      @media (max-width: 640px) {
        font-size: 2rem;
      }
    }

    .role-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1.25rem;
      border-radius: 8px;
      background: ${({ theme }) => 
        theme.scheme === "dark" 
          ? `${theme.colors.primary}20` 
          : `${theme.colors.primary}10`};
      border: 1px solid ${({ theme }) => 
        theme.scheme === "dark" 
          ? theme.colors.primary 
          : `${theme.colors.primary}30`};
      margin-bottom: 1.5rem;
      box-shadow: ${({ theme }) => 
        theme.scheme === "dark" 
          ? `0 0 15px ${theme.colors.primary}30` 
          : "none"};

      .role-icon {
        width: 16px;
        height: 16px;
        color: ${({ theme }) => theme.colors.primary};
      }

      .role {
        font-size: 0.9375rem;
        font-weight: 600;
        color: ${({ theme }) => 
          theme.scheme === "dark" 
            ? theme.colors.primary 
            : theme.colors.primary};
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    }

    .bio {
      font-size: 1.125rem;
      color: ${({ theme }) => 
        theme.scheme === "dark" 
          ? "#e4e4e7" 
          : theme.colors.gray10};
      line-height: 1.7;
      margin-bottom: 2rem;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }
  }
`
