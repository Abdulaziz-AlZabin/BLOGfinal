import Link from "next/link"
import Image from "next/image"
import styled from "@emotion/styled"
import { TPost } from "src/types"
import { formatDate } from "src/libs/utils"
import { CONFIG } from "site.config"
import { FiCalendar, FiArrowRight } from "react-icons/fi"

type Props = {
  data: TPost
  viewMode: "grid" | "list"
}

const PostCard: React.FC<Props> = ({ data, viewMode }) => {
  const date = data?.date?.start_date || data.createdTime

  return (
    <StyledWrapper href={`/${data.slug}`} data-view={viewMode}>
      {data.thumbnail && (
        <div className="thumbnail">
          <Image
            src={data.thumbnail}
            alt={data.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="thumbnail-img"
          />
          <div className="thumbnail-overlay" />
        </div>
      )}

      <div className="content">
        {data.category && data.category[0] && (
          <span className="category">{data.category[0]}</span>
        )}

        <h3 className="title">{data.title}</h3>

        {data.summary && <p className="summary">{data.summary}</p>}

        <div className="meta">
          <span className="date">
            <FiCalendar />
            {formatDate(date, CONFIG.lang)}
          </span>

          {data.tags && data.tags.length > 0 && (
            <div className="tags">
              {data.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="tag">
                  #{tag}
                </span>
              ))}
              {data.tags.length > 2 && (
                <span className="tag more">+{data.tags.length - 2}</span>
              )}
            </div>
          )}
        </div>

        <span className="read-more">
          Read more <FiArrowRight />
        </span>
      </div>
    </StyledWrapper>
  )
}

export default PostCard

const StyledWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.gray2};
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.gray5};
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -12px ${({ theme }) => 
      theme.scheme === "light" 
        ? "rgba(0, 0, 0, 0.15)" 
        : "rgba(0, 0, 0, 0.4)"};

    .thumbnail-img {
      transform: scale(1.05);
    }

    .read-more {
      color: ${({ theme }) => theme.colors.primary};
      gap: 0.75rem;
    }
  }

  &[data-view="list"] {
    flex-direction: row;

    .thumbnail {
      width: 280px;
      min-width: 280px;
      padding-bottom: 0;
      height: 180px;

      @media (max-width: 768px) {
        width: 100%;
        min-width: auto;
        height: auto;
        padding-bottom: 56%;
      }
    }

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .thumbnail {
    position: relative;
    width: 100%;
    padding-bottom: 56%;
    overflow: hidden;

    .thumbnail-img {
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    .thumbnail-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        transparent 50%,
        ${({ theme }) => theme.colors.gray2}10 100%
      );
    }
  }

  .content {
    flex: 1;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;

    .category {
      display: inline-block;
      width: fit-content;
      padding: 0.25rem 0.75rem;
      border-radius: 6px;
      background: ${({ theme }) => theme.colors.primary}15;
      color: ${({ theme }) => theme.colors.primary};
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.75rem;
    }

    .title {
      font-size: 1.25rem;
      font-weight: 700;
      line-height: 1.4;
      color: ${({ theme }) => theme.colors.gray12};
      margin-bottom: 0.75rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .summary {
      font-size: 0.9375rem;
      line-height: 1.6;
      color: ${({ theme }) => theme.colors.gray10};
      margin-bottom: 1rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-top: auto;
      flex-wrap: wrap;

      .date {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.8125rem;
        color: ${({ theme }) => theme.colors.gray9};

        svg {
          width: 14px;
          height: 14px;
        }
      }

      .tags {
        display: flex;
        gap: 0.5rem;

        .tag {
          font-size: 0.8125rem;
          color: ${({ theme }) => theme.colors.gray9};

          &.more {
            color: ${({ theme }) => theme.colors.primary};
          }
        }
      }
    }

    .read-more {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.gray10};
      transition: all 0.2s ease;

      svg {
        width: 16px;
        height: 16px;
        transition: transform 0.2s ease;
      }
    }
  }
`
