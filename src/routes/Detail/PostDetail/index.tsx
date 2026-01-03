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
    /* Better text readability */
    color: ${({ theme }) => theme.colors.gray12};
    
    /* Improve paragraph spacing */
    p {
      margin-bottom: 1rem;
      line-height: 1.8;
      color: ${({ theme }) => theme.colors.gray11};
    }

    /* Headings */
    h1, h2, h3, h4, h5, h6 {
      color: ${({ theme }) => theme.colors.gray12};
      margin-top: 2rem;
      margin-bottom: 1rem;
    }

    /* Links */
    a {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: underline;
      text-decoration-color: ${({ theme }) => `${theme.colors.primary}40`};
      transition: all 0.2s ease;

      &:hover {
        text-decoration-color: ${({ theme }) => theme.colors.primary};
      }
    }

    /* Lists */
    ul, ol {
      margin-bottom: 1rem;
      padding-left: 1.5rem;
      color: ${({ theme }) => theme.colors.gray11};
    }

    li {
      margin-bottom: 0.5rem;
    }

    /* Code blocks */
    code {
      background: ${({ theme }) => theme.colors.gray3};
      color: ${({ theme }) => theme.colors.gray12};
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-size: 0.9em;
    }

    pre {
      background: ${({ theme }) => theme.colors.gray3} !important;
      border: 1px solid ${({ theme }) => theme.colors.gray4};
      border-radius: 8px;
      padding: 1rem;
      overflow-x: auto;
      margin-bottom: 1rem;

      code {
        background: transparent;
        padding: 0;
      }
    }

    /* Blockquotes */
    blockquote {
      border-left: 4px solid ${({ theme }) => theme.colors.primary};
      padding-left: 1rem;
      margin: 1.5rem 0;
      color: ${({ theme }) => theme.colors.gray10};
      font-style: italic;
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
        background: ${({ theme }) => theme.colors.gray3};
        font-weight: 600;
        color: ${({ theme }) => theme.colors.gray12};
      }

      td {
        color: ${({ theme }) => theme.colors.gray11};
      }
    }

    /* Images */
    img {
      border-radius: 8px;
      max-width: 100%;
      height: auto;
      margin: 1rem 0;
    }
  }
`
