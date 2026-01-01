import styled from "@emotion/styled"
import { FiX } from "react-icons/fi"

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
            Clear
          </button>
        )}
        {sortedTags.map(([tag, count]) => (
          <button
            key={tag}
            className={`tag ${selectedTag === tag ? "active" : ""}`}
            onClick={() => onSelectTag(selectedTag === tag ? null : tag)}
          >
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
  margin-bottom: 1rem;

  .tags-scroll {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding: 0.5rem 0;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    background: ${({ theme }) => theme.colors.gray3};
    color: ${({ theme }) => theme.colors.gray11};
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;
    transition: all 0.2s ease;
    border: 1px solid transparent;

    &:hover {
      background: ${({ theme }) => theme.colors.gray4};
    }

    &.active {
      background: ${({ theme }) => theme.colors.primary};
      color: white;
      border-color: ${({ theme }) => theme.colors.primary};
    }

    &.clear-tag {
      background: ${({ theme }) => theme.colors.error}15;
      color: ${({ theme }) => theme.colors.error};
      border-color: ${({ theme }) => theme.colors.error}30;

      &:hover {
        background: ${({ theme }) => theme.colors.error}25;
      }

      svg {
        width: 14px;
        height: 14px;
      }
    }

    .tag-count {
      padding: 0.125rem 0.5rem;
      border-radius: 9999px;
      background: ${({ theme }) => theme.colors.gray5};
      font-size: 0.75rem;
      color: ${({ theme }) => theme.colors.gray10};
    }

    &.active .tag-count {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }
  }
`
