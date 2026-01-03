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
          <div className="thumbnail-glow" />
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
          <span>Read more</span>
          <FiArrowRight className="arrow" />
        </span>
      </div>

      <div className="card-border" />
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
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 1px;
    background: ${({ theme }) => 
      theme.scheme === "dark"
        ? `linear-gradient(135deg, ${theme.colors.neon}, ${theme.colors.cyber}, ${theme.colors.purple})`
        : theme.colors.gray4};
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .card-border {
    position: absolute;
    inset: -1px;
    border-radius: 16px;
    background: ${({ theme }) => 
      theme.scheme === "dark"
        ? `linear-gradient(135deg, ${theme.colors.neon}, ${theme.colors.cyber})`
        : "transparent"};
    opacity: 0;
    z-index: -1;
    transition: opacity 0.4s ease;
    filter: blur(12px);
  }

  &:hover {
    border-color: ${({ theme }) => 
      theme.scheme === "dark" 
        ? theme.colors.neon
        : theme.colors.gray5};
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => 
      theme.scheme === "dark" 
        ? `0 20px 50px -12px ${theme.colors.neonGlow}, 0 0 15px rgba(0, 255, 65, 0.1)`
        : "0 20px 40px -12px rgba(0, 0, 0, 0.15)"};

    &::before {
      opacity: 1;
    }

    .card-border {
      opacity: ${({ theme }) => theme.scheme === "dark" ? "0.6" : "0"};
    }

    .thumbnail-img {
      transform: scale(1.08);
    }

    .thumbnail-glow {
      opacity: 0.8;
    }

    .read-more {
      color: ${({ theme }) => theme.colors.primary};
      gap: 0.75rem;

      .arrow {
        transform: translateX(4px);
      }
    }

    .title {
      color: ${({ theme }) => 
        theme.scheme === "dark" 
          ? theme.colors.neon
          : theme.colors.primary};
    }
  }

  &[data-view="list"] {
    flex-direction: row;

    .thumbnail {
      width: 280px;
      min-width: 280px;
      padding-bottom: 0;
      height: 200px;

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

    .thumbnail-glow {
      position: absolute;
      inset: 0;
      background: ${({ theme }) => 
        theme.scheme === "dark"
          ? `linear-gradient(135deg, ${theme.colors.neon}30, ${theme.colors.cyber}30)`
          : "transparent"};
      opacity: 0;
      transition: opacity 0.4s ease;
      z-index: 2;
    }

    .thumbnail-img {
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .thumbnail-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        transparent 40%,
        ${({ theme }) => theme.colors.gray2}80 100%
      );
      z-index: 1;
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
      padding: 0.375rem 1rem;
      border-radius: 8px;
      background: ${({ theme }) => `${theme.colors.primary}12`};
      border: 1px solid ${({ theme }) => `${theme.colors.primary}30`};
      color: ${({ theme }) => theme.colors.primary};
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 1rem;
    }

    .title {
      font-size: 1.375rem;
      font-weight: 700;
      line-height: 1.4;
      color: ${({ theme }) => theme.colors.gray12};
      margin-bottom: 0.875rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      transition: color 0.3s ease;
    }

    .summary {
      font-size: 0.9375rem;
      line-height: 1.7;
      color: ${({ theme }) => theme.colors.gray10};
      margin-bottom: 1.25rem;
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
      padding-top: 1rem;
      border-top: 1px solid ${({ theme }) => theme.colors.gray4};

      .date {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.8125rem;
        color: ${({ theme }) => theme.colors.gray9};

        svg {
          width: 14px;
          height: 14px;
          color: ${({ theme }) => 
            theme.scheme === "dark" 
              ? theme.colors.cyber
              : theme.colors.gray9};
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
            font-weight: 600;
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
      transition: all 0.3s ease;
      font-family: 'Courier New', monospace;

      .arrow {
        width: 16px;
        height: 16px;
        transition: transform 0.3s ease;
      }
    }
  }
`
