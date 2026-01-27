import styled from "@emotion/styled"
import Link from "next/link"
import { FiArrowLeft, FiCalendar } from "react-icons/fi"
import { CONFIG } from "site.config"
import { formatDate } from "src/libs/utils"
import useMermaidEffect from "./hooks/useMermaidEffect"
import PostDetail from "./PostDetail"
import PageDetail from "./PageDetail"
import usePostQuery from "src/hooks/usePostQuery"

const Detail: React.FC = () => {
  const data = usePostQuery()
  useMermaidEffect()

  if (!data) return null

  const date = data.date?.start_date || data.createdTime

  return (
    <StyledWrapper data-type={data.type}>
      <div className="detail-header">
        <Link href="/" className="back-link">
          <FiArrowLeft />
          <span>Back to posts</span>
        </Link>

        {data.category && data.category[0] && (
          <span className="category">{data.category[0]}</span>
        )}

        <h1 className="title">{data.title}</h1>

        {data.summary && <p className="summary">{data.summary}</p>}

        <div className="meta">
          <span className="meta-item">
            <FiCalendar />
            {formatDate(date, CONFIG.lang)}
          </span>
          {data.tags && data.tags.length > 0 && (
            <div className="tags">
              {data.tags.map((tag) => (
                <span key={tag} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="detail-content">
        {data.type[0] === "Page" && <PageDetail />}
        {data.type[0] !== "Page" && <PostDetail />}
      </div>
    </StyledWrapper>
  )
}

export default Detail

const StyledWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem;

  .detail-header {
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray4};

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.gray10};
      background: ${({ theme }) => theme.colors.gray3};
      margin-bottom: 2rem;
      transition: all 0.2s ease;
      border: 1px solid transparent;

      &:hover {
        background: ${({ theme }) => theme.colors.gray4};
        color: ${({ theme }) => theme.colors.primary};
        border-color: ${({ theme }) => theme.colors.primary};
      }

      svg {
        width: 16px;
        height: 16px;
      }
    }

    .category {
      display: inline-block;
      padding: 0.375rem 1rem;
      border-radius: 8px;
      background: ${({ theme }) => `${theme.colors.primary}15`};
      color: ${({ theme }) => theme.colors.primary};
      font-size: 0.8125rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1rem;
      border: 1px solid ${({ theme }) => `${theme.colors.primary}30`};
    }

    .title {
      font-size: 2.5rem;
      font-weight: 800;
      line-height: 1.2;
      color: #ffffff;
      margin-bottom: 1rem;

      @media (max-width: 640px) {
        font-size: 1.75rem;
      }
    }

    .summary {
      font-size: 1.125rem;
      line-height: 1.7;
      color: #e4e4e7;
      margin-bottom: 1.5rem;
    }

    .meta {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      flex-wrap: wrap;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        color: #d4d4d8;

        svg {
          width: 16px;
          height: 16px;
          color: ${({ theme }) => theme.colors.primary};
        }
      }

      .tags {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;

        .tag {
          font-size: 0.875rem;
          color: ${({ theme }) => theme.colors.primary};
          font-weight: 500;
        }
      }
    }
  }

  .detail-content {
    /* Enhanced readability for Notion content */
  }

  &[data-type="Paper"] {
    padding: 40px 0;
  }

  code[class*="language-mermaid"],
  pre[class*="language-mermaid"] {
    background-color: ${({ theme }) => theme.colors.gray3} !important;
  }
`
