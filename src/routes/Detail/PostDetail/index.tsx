import React from "react"
import PostHeader from "./PostHeader"
import Footer from "./PostFooter"
import CommentBox from "./CommentBox"
import Category from "src/components/Category"
import styled from "@emotion/styled"
import NotionRenderer from "../components/NotionRenderer"
import usePostQuery from "src/hooks/usePostQuery"

type Props = {}

const PostDetail: React.FC<Props> = () => {
  const data = usePostQuery()

  if (!data) return null

  const category = (data.category && data.category?.[0]) || undefined

  return (
    <StyledWrapper>
      <article>
        {category && (
          <div css={{ marginBottom: "0.5rem" }}>
            <Category readOnly={data.status?.[0] === "PublicOnDetail"}>
              {category}
            </Category>
          </div>
        )}
        {data.type[0] === "Post" && <PostHeader data={data} />}
        <div className="notion-content">
          <NotionRenderer recordMap={data.recordMap} />
        </div>
        {data.type[0] === "Post" && (
          <>
            <Footer />
            <CommentBox data={data} />
          </>
        )}
      </article>
    </StyledWrapper>
  )
}

export default PostDetail

const StyledWrapper = styled.div`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  border-radius: 1.5rem;
  max-width: 56rem;
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray2};
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin: 0 auto;

  > article {
    margin: 0 auto;
    max-width: 42rem;
  }

  .notion-content {
    /* Better text readability with brighter colors in dark mode */
    color: ${({ theme }) => 
      theme.scheme === "dark" 
        ? "#ffffff" 
        : theme.colors.gray12};
    
    /* Improve paragraph spacing */
    p {
      margin-bottom: 1rem;
      line-height: 1.8;
      color: ${({ theme }) => 
        theme.scheme === "dark" 
          ? "#e4e4e7" 
          : theme.colors.gray11};
      font-size: 1.0625rem;
    }

    /* Headings */
    h1, h2, h3, h4, h5, h6 {
      color: ${({ theme }) => 
        theme.scheme === "dark" 
          ? "#ffffff" 
          : theme.colors.gray12};
      margin-top: 2rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    h1 { font-size: 2rem; }
    h2 { font-size: 1.625rem; }
    h3 { font-size: 1.375rem; }

    /* Links with green highlight */
    a {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: underline;
      text-decoration-color: ${({ theme }) => `${theme.colors.primary}40`};
      transition: all 0.2s ease;
      font-weight: 500;

      &:hover {
        text-decoration-color: ${({ theme }) => theme.colors.primary};
        text-shadow: ${({ theme }) => 
          theme.scheme === "dark" 
            ? `0 0 10px ${theme.colors.primary}40` 
            : "none"};
      }
    }

    /* Lists */
    ul, ol {
      margin-bottom: 1rem;
      padding-left: 1.5rem;
      color: ${({ theme }) => 
        theme.scheme === "dark" 
          ? "#e4e4e7" 
          : theme.colors.gray11};
    }

    li {
      margin-bottom: 0.5rem;
      line-height: 1.7;
    }

    /* Code blocks with green accent */
    code {
      background: ${({ theme }) => 
        theme.scheme === "dark" 
          ? theme.colors.gray3 
          : theme.colors.gray3};
      color: ${({ theme }) => 
        theme.scheme === "dark" 
          ? "#e4e4e7" 
          : theme.colors.gray12};
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-size: 0.9em;
      font-weight: 500;
      border: 1px solid ${({ theme }) => 
        theme.scheme === "dark" 
          ? `${theme.colors.primary}20` 
          : "transparent"};
    }

    pre {
      background: ${({ theme }) => theme.colors.gray3} !important;
      border: 1px solid ${({ theme }) => 
        theme.scheme === "dark" 
          ? `${theme.colors.primary}30` 
          : theme.colors.gray4};
      border-radius: 8px;
      padding: 1rem;
      overflow-x: auto;
      margin-bottom: 1rem;

      code {
        background: transparent;
        padding: 0;
        border: none;
        color: ${({ theme }) => 
          theme.scheme === "dark" 
            ? "#e4e4e7" 
            : theme.colors.gray12};
      }
    }

    /* Blockquotes */
    blockquote {
      border-left: 4px solid ${({ theme }) => theme.colors.primary};
      padding-left: 1rem;
      margin: 1.5rem 0;
      color: ${({ theme }) => 
        theme.scheme === "dark" 
          ? "#d4d4d8" 
          : theme.colors.gray10};
      font-style: italic;
      font-size: 1.0625rem;
      background: ${({ theme }) => 
        theme.scheme === "dark" 
          ? `${theme.colors.primary}10` 
          : "transparent"};
      padding: 1rem;
      border-radius: 4px;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1rem;

      th, td {
        border: 1px solid ${({ theme }) => theme.colors.gray4};
        padding: 0.75rem;
        text-align: left;
      }

      th {
        background: ${({ theme }) => 
          theme.scheme === "dark" 
            ? `${theme.colors.primary}15` 
            : theme.colors.gray3};
        font-weight: 600;
        color: ${({ theme }) => 
          theme.scheme === "dark" 
            ? "#ffffff" 
            : theme.colors.gray12};
        border-bottom: 2px solid ${({ theme }) => 
          theme.scheme === "dark" 
            ? theme.colors.primary 
            : theme.colors.gray5};
      }

      td {
        color: ${({ theme }) => 
          theme.scheme === "dark" 
            ? "#e4e4e7" 
            : theme.colors.gray11};
      }
    }

    /* Images */
    img {
      border-radius: 8px;
      max-width: 100%;
      height: auto;
      margin: 1rem 0;
      border: 1px solid ${({ theme }) => 
        theme.scheme === "dark" 
          ? `${theme.colors.primary}20` 
          : theme.colors.gray4};
    }

    /* Strong/Bold text */
    strong, b {
      font-weight: 700;
      color: ${({ theme }) => 
        theme.scheme === "dark" 
          ? "#ffffff" 
          : theme.colors.gray12};
    }

    /* Emphasis/Italic */
    em, i {
      font-style: italic;
    }
  }
`
