import styled from "@emotion/styled"
import { FiX, FiHash } from "react-icons/fi"

type Props = {
  tags: Record<string, number>
  selectedTag: string | null
  onSelectTag: (tag: string | null) => void
}

const TagList: React.FC<Props> = ({ tags, selectedTag, onSelectTag }) => {
  const sortedTags = Object.entries(tags).sort((a, b) => b[1] - a[1])

  if (sortedTags.length === 0) return null

  return (
    <StyledWrapper>
      <div className="tags-container">
        {selectedTag && (
          <button
            className="tag clear-tag"
            onClick={() => onSelectTag(null)}
            data-testid="clear-tag-filter"
          >
            <FiX />
            <span>Clear</span>
          </button>
        )}
        {sortedTags.map(([tag, count]) => (
          <button
            key={tag}
            className={`tag ${selectedTag === tag ? "active" : ""}`}
            onClick={() => onSelectTag(selectedTag === tag ? null : tag)}
            data-testid={`tag-${tag}`}
          >
            <FiHash className="hash-icon" />
            <span className="tag-name">{tag}</span>
            <span className="tag-count">{count}</span>
          </button>
        ))}
      </div>
    </StyledWrapper>
  )
}

export default TagList

const StyledWrapper = styled.div`
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1.25rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }

  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.625rem;
    padding: 0.5rem 0;

    @media (max-width: 768px) {
      gap: 0.5rem;
    }

    @media (max-width: 480px) {
      gap: 0.375rem;
    }
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    background: ${({ theme }) => theme.colors.gray3};
    color: ${({ theme }) => 
      theme.scheme === "dark" 
        ? theme.colors.gray11 
        : theme.colors.gray11};
    font-size: 0.8125rem;
    font-weight: 500;
    white-space: nowrap;
    transition: all 0.25s ease;
    border: 1px solid ${({ theme }) => theme.colors.gray4};
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;

    @media (max-width: 768px) {
      padding: 0.4375rem 0.875rem;
      font-size: 0.75rem;
      gap: 0.3125rem;
      border-radius: 16px;
    }

    @media (max-width: 480px) {
      padding: 0.375rem 0.75rem;
      font-size: 0.6875rem;
      gap: 0.25rem;
      border-radius: 14px;
    }

    .hash-icon {
      width: 12px;
      height: 12px;
      flex-shrink: 0;
      color: ${({ theme }) => 
        theme.scheme === "dark" 
          ? theme.colors.gray9 
          : theme.colors.gray8};
      transition: color 0.25s ease;

      @media (max-width: 768px) {
        width: 11px;
        height: 11px;
      }

      @media (max-width: 480px) {
        width: 10px;
        height: 10px;
      }
    }

    .tag-name {
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;

      @media (max-width: 480px) {
        max-width: 80px;
      }
    }

    .tag-count {
      padding: 0.125rem 0.4375rem;
      border-radius: 10px;
      background: ${({ theme }) => theme.colors.gray5};
      font-size: 0.6875rem;
      color: ${({ theme }) => 
        theme.scheme === "dark" 
          ? theme.colors.gray10 
          : theme.colors.gray9};
      font-weight: 600;
      min-width: 18px;
      text-align: center;

      @media (max-width: 768px) {
        padding: 0.0625rem 0.375rem;
        font-size: 0.625rem;
        min-width: 16px;
      }

      @media (max-width: 480px) {
        padding: 0.0625rem 0.3125rem;
        font-size: 0.5625rem;
        min-width: 14px;
      }
    }

    &:hover, &:focus {
      background: ${({ theme }) => theme.colors.gray4};
      border-color: ${({ theme }) => 
        theme.scheme === "dark" 
          ? theme.colors.neon
          : theme.colors.gray5};
      outline: none;

      .hash-icon {
        color: ${({ theme }) => 
          theme.scheme === "dark" 
            ? theme.colors.neon
            : theme.colors.primary};
      }
    }

    &:active {
      transform: scale(0.97);
    }

    &.active {
      background: ${({ theme }) => 
        theme.scheme === "dark"
          ? `${theme.colors.primary}30`
          : theme.colors.primary};
      color: ${({ theme }) => 
        theme.scheme === "dark" 
          ? theme.colors.primary
          : "white"};
      border-color: ${({ theme }) => 
        theme.scheme === "dark" 
          ? theme.colors.primary
          : theme.colors.primary};
      box-shadow: ${({ theme }) => 
        theme.scheme === "dark" 
          ? `0 0 12px ${theme.colors.primary}30`
          : "0 2px 8px rgba(99, 102, 241, 0.25)"};

      .hash-icon {
        color: ${({ theme }) => 
          theme.scheme === "dark" 
            ? theme.colors.primary
            : "white"};
      }

      .tag-count {
        background: ${({ theme }) => 
          theme.scheme === "dark"
            ? theme.colors.primary
            : "rgba(255, 255, 255, 0.25)"};
        color: ${({ theme }) => 
          theme.scheme === "dark" 
            ? "#000"
            : "white"};
      }
    }

    &.clear-tag {
      background: ${({ theme }) => 
        theme.scheme === "dark"
          ? `${theme.colors.error}15`
          : `${theme.colors.error}10`};
      color: ${({ theme }) => theme.colors.error};
      border-color: ${({ theme }) => `${theme.colors.error}30`};
      padding-right: 0.875rem;

      @media (max-width: 768px) {
        padding-right: 0.75rem;
      }

      @media (max-width: 480px) {
        padding-right: 0.625rem;
      }

      svg {
        width: 12px;
        height: 12px;

        @media (max-width: 480px) {
          width: 10px;
          height: 10px;
        }
      }

      &:hover, &:focus {
        background: ${({ theme }) => `${theme.colors.error}25`};
        border-color: ${({ theme }) => theme.colors.error};
      }
    }
  }
`
