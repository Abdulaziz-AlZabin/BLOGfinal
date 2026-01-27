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
      <div className="tags-scroll">
        {selectedTag && (
          <button
            className="tag clear-tag"
            onClick={() => onSelectTag(null)}
          >
            <FiX />
            Clear Filter
          </button>
        )}
        {sortedTags.map(([tag, count]) => (
          <button
            key={tag}
            className={`tag ${selectedTag === tag ? "active" : ""}`}
            onClick={() => onSelectTag(selectedTag === tag ? null : tag)}
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

  .tags-scroll {
    display: flex;
    gap: 0.75rem;
    overflow-x: auto;
    padding: 0.75rem 0;
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => 
      theme.scheme === "dark" 
        ? `${theme.colors.neon}40 ${theme.colors.gray3}`
        : `${theme.colors.gray7} ${theme.colors.gray3}`};

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.colors.gray3};
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => 
        theme.scheme === "dark" 
          ? theme.colors.neon
          : theme.colors.gray7};
      border-radius: 10px;

      &:hover {
        background: ${({ theme }) => 
          theme.scheme === "dark" 
            ? theme.colors.cyber
            : theme.colors.gray8};
      }
    }
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    border-radius: 9999px;
    background: ${({ theme }) => theme.colors.gray3};
    color: ${({ theme }) => 
      theme.scheme === \"dark\" 
        ? theme.colors.gray11 
        : theme.colors.gray11};
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid ${({ theme }) => theme.colors.gray4};
    position: relative;
    overflow: hidden;
    font-family: 'Courier New', monospace;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: ${({ theme }) => 
        theme.scheme === "dark"
          ? `linear-gradient(135deg, ${theme.colors.neon}20, ${theme.colors.cyber}20)`
          : theme.colors.gray4};
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .hash-icon {
      width: 14px;
      height: 14px;
      position: relative;
      z-index: 1;
      color: ${({ theme }) => theme.colors.gray9};
      transition: color 0.3s ease;
    }

    .tag-name,
    .tag-count {
      position: relative;
      z-index: 1;
    }

    &:hover {
      background: ${({ theme }) => theme.colors.gray4};
      border-color: ${({ theme }) => 
        theme.scheme === "dark" 
          ? theme.colors.neon
          : theme.colors.gray5};
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => 
        theme.scheme === "dark" 
          ? `0 4px 10px ${theme.colors.neonGlow}`
          : "0 4px 12px rgba(0, 0, 0, 0.1)"};

      &::before {
        opacity: 1;
      }

      .hash-icon {
        color: ${({ theme }) => 
          theme.scheme === "dark" 
            ? theme.colors.neon
            : theme.colors.primary};
      }
    }

    &.active {
      background: ${({ theme }) => 
        theme.scheme === "dark"
          ? `linear-gradient(135deg, ${theme.colors.neon}20, ${theme.colors.cyber}20)`
          : theme.colors.primary};
      color: ${({ theme }) => 
        theme.scheme === "dark" 
          ? theme.colors.neon
          : "white"};
      border-color: ${({ theme }) => 
        theme.scheme === "dark" 
          ? theme.colors.neon
          : theme.colors.primary};
      box-shadow: ${({ theme }) => 
        theme.scheme === "dark" 
          ? `0 0 15px ${theme.colors.neonGlow}, inset 0 0 10px ${theme.colors.neonGlow}`
          : "0 4px 15px rgba(99, 102, 241, 0.3)"};

      &::before {
        opacity: 1;
      }

      .hash-icon {
        color: ${({ theme }) => 
          theme.scheme === "dark" 
            ? theme.colors.neon
            : "white"};
      }
    }

    &.clear-tag {
      background: ${({ theme }) => 
        theme.scheme === "dark"
          ? `${theme.colors.error}20`
          : `${theme.colors.error}15`};
      color: ${({ theme }) => theme.colors.error};
      border-color: ${({ theme }) => `${theme.colors.error}40`};

      &:hover {
        background: ${({ theme }) => `${theme.colors.error}30`};
        border-color: ${({ theme }) => theme.colors.error};
        box-shadow: ${({ theme }) => 
          theme.scheme === "dark" 
            ? `0 4px 15px ${theme.colors.error}40`
            : "0 4px 12px rgba(239, 68, 68, 0.2)"};
      }

      svg {
        width: 14px;
        height: 14px;
      }
    }

    .tag-count {
      padding: 0.25rem 0.625rem;
      border-radius: 9999px;
      background: ${({ theme }) => theme.colors.gray5};
      font-size: 0.75rem;
      color: ${({ theme }) => theme.colors.gray10};
      font-weight: 600;
      transition: all 0.3s ease;
    }

    &.active .tag-count {
      background: ${({ theme }) => 
        theme.scheme === "dark"
          ? theme.colors.neon
          : "rgba(255, 255, 255, 0.3)"};
      color: ${({ theme }) => 
        theme.scheme === "dark" 
          ? "#000"
          : "white"};
    }
  }
`
