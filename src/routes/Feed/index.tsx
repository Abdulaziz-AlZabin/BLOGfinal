import { useState } from "react"
import styled from "@emotion/styled"
import { FiSearch, FiGrid, FiList, FiTerminal } from "react-icons/fi"
import PostCard from "./PostList/PostCard"
import Footer from "./Footer"
import ProfileCard from "./ProfileCard"
import TagList from "./TagList"
import usePostsQuery from "src/hooks/usePostsQuery"
import { CONFIG } from "site.config"

type ViewMode = "grid" | "list"

const Feed: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const posts = usePostsQuery()

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = !selectedTag || post.tags?.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  const allTags = posts.reduce((acc, post) => {
    post.tags?.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1
    })
    return acc
  }, {} as Record<string, number>)

  return (
    <StyledWrapper>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <ProfileCard />
        </div>
        <div className="hero-gradient" />
      </section>

      {/* Main Content */}
      <section className="content-section">
        {/* Search and Filter Bar */}
        <div className="toolbar">
          <div className="search-wrapper">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="$ search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="clear-search"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <div className="view-toggle">
            <button
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "active" : ""}
              aria-label="Grid view"
              data-testid="grid-view-btn"
            >
              <FiGrid />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "active" : ""}
              aria-label="List view"
              data-testid="list-view-btn"
            >
              <FiList />
            </button>
          </div>
        </div>

        {/* Tags */}
        <TagList
          tags={allTags}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
        />

        {/* Posts Header */}
        <div className="posts-header">
          <h2>
            <FiTerminal className="terminal-icon" />
            <span className="bracket">{'['}</span>
            Latest Posts
            <span className="bracket">{']'}</span>
          </h2>
          <span className="post-count">
            <span className="prompt">$</span> {filteredPosts.length} posts
          </span>
        </div>

        {/* Posts Grid/List */}
        <div className={`posts-container ${viewMode}`}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post.id} data={post} viewMode={viewMode} />
            ))
          ) : (
            <div className="no-posts">
              <div className="no-posts-icon">404</div>
              <p>No posts found</p>
              <span>Try adjusting your search or filters</span>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </StyledWrapper>
  )
}

export default Feed

const StyledWrapper = styled.div`
  .hero {
    position: relative;
    padding: 4rem 0 3rem;
    margin-bottom: 3rem;

    @media (max-width: 768px) {
      padding: 2rem 0 1.5rem;
      margin-bottom: 2rem;
    }

    .hero-content {
      position: relative;
      z-index: 1;
    }

    .hero-gradient {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      max-width: 900px;
      height: 400px;
      background: ${({ theme }) => 
        theme.scheme === "dark"
          ? `radial-gradient(
              ellipse at center,
              ${theme.colors.neon}15 0%,
              ${theme.colors.cyber}10 30%,
              ${theme.colors.purple}05 50%,
              transparent 70%
            )`
          : `radial-gradient(
              ellipse at center,
              ${theme.colors.primary}10 0%,
              transparent 70%
            )`};
      pointer-events: none;
      animation: pulse 4s ease-in-out infinite;
    }
  }

  .content-section {
    max-width: 1200px;
    margin: 0 auto;
  }

  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.5rem;

    @media (max-width: 640px) {
      flex-direction: column;
      align-items: stretch;
    }
  }

  .search-wrapper {
    position: relative;
    flex: 1;
    max-width: 450px;

    @media (max-width: 640px) {
      max-width: 100%;
    }

    .search-icon {
      position: absolute;
      left: 1.125rem;
      top: 50%;
      transform: translateY(-50%);
      color: ${({ theme }) => 
        theme.scheme === "dark" 
          ? theme.colors.neon
          : theme.colors.gray8};
      width: 18px;
      height: 18px;
      z-index: 1;
    }

    .search-input {
      width: 100%;
      padding: 0.875rem 3rem 0.875rem 3rem;
      border: 1px solid ${({ theme }) => theme.colors.gray4};
      border-radius: 12px;
      background: ${({ theme }) => theme.colors.gray2};
      color: ${({ theme }) => theme.colors.gray12};
      font-size: 0.9375rem;
      font-family: 'Courier New', monospace;
      transition: all 0.3s ease;

      &::placeholder {
        color: ${({ theme }) => theme.colors.gray8};
      }

      &:focus {
        outline: none;
        border-color: ${({ theme }) => 
          theme.scheme === "dark" 
            ? theme.colors.neon
            : theme.colors.primary};
        background: ${({ theme }) => theme.colors.gray1};
        box-shadow: ${({ theme }) => 
          theme.scheme === "dark" 
            ? `0 0 0 3px ${theme.colors.neonGlow}, 0 0 12px ${theme.colors.neonGlow}`
            : `0 0 0 3px ${theme.colors.primary}20`};
      }
    }

    .clear-search {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${({ theme }) => theme.colors.gray9};
      font-size: 1.5rem;
      transition: all 0.2s ease;
      z-index: 1;

      &:hover {
        color: ${({ theme }) => theme.colors.error};
        background: ${({ theme }) => `${theme.colors.error}15`};
      }
    }
  }

  .view-toggle {
    display: flex;
    background: ${({ theme }) => theme.colors.gray3};
    border-radius: 12px;
    padding: 5px;
    border: 1px solid ${({ theme }) => theme.colors.gray4};

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 38px;
      border-radius: 10px;
      color: ${({ theme }) => theme.colors.gray8};
      transition: all 0.3s ease;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 10px;
        background: ${({ theme }) => 
          theme.scheme === "dark"
            ? `linear-gradient(135deg, ${theme.colors.neon}20, ${theme.colors.cyber}20)`
            : theme.colors.gray1};
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      &.active {
        background: ${({ theme }) => theme.colors.gray1};
        color: ${({ theme }) => 
          theme.scheme === "dark" 
            ? theme.colors.neon
            : theme.colors.primary};
        box-shadow: ${({ theme }) => 
          theme.scheme === "dark" 
            ? `0 0 10px ${theme.colors.neonGlow}`
            : "0 1px 3px rgba(0, 0, 0, 0.1)"};
        border: 1px solid ${({ theme }) => 
          theme.scheme === "dark" 
            ? theme.colors.neon
            : "transparent"};

        &::before {
          opacity: 1;
        }
      }

      &:not(.active):hover {
        color: ${({ theme }) => theme.colors.gray11};
        background: ${({ theme }) => theme.colors.gray4};
      }

      svg {
        width: 18px;
        height: 18px;
        position: relative;
        z-index: 1;
      }
    }
  }

  .posts-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin: 2.5rem 0 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${({ theme }) => 
      theme.scheme === "dark" 
        ? `${theme.colors.neon}20`
        : theme.colors.gray4};

    h2 {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.75rem;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.gray12};
      font-family: 'Courier New', monospace;

      .terminal-icon {
        width: 24px;
        height: 24px;
        color: ${({ theme }) => 
          theme.scheme === "dark" 
            ? theme.colors.cyber
            : theme.colors.primary};
      }

      .bracket {
        color: ${({ theme }) => 
          theme.scheme === "dark" 
            ? theme.colors.purple
            : theme.colors.primary};
      }
    }

    .post-count {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: ${({ theme }) => theme.colors.gray9};
      font-family: 'Courier New', monospace;

      .prompt {
        color: ${({ theme }) => 
          theme.scheme === "dark" 
            ? theme.colors.neon
            : theme.colors.primary};
        font-weight: 700;
      }
    }
  }

  .posts-container {
    &.grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 1.5rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    &.list {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
  }

  .no-posts {
    grid-column: 1 / -1;
    text-align: center;
    padding: 5rem 2rem;
    background: ${({ theme }) => theme.colors.gray2};
    border-radius: 20px;
    border: 1px solid ${({ theme }) => theme.colors.gray4};

    .no-posts-icon {
      font-size: 4rem;
      font-weight: 900;
      font-family: 'Courier New', monospace;
      background: ${({ theme }) => 
        theme.scheme === "dark"
          ? `linear-gradient(135deg, ${theme.colors.neon}, ${theme.colors.cyber})`
          : `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 1rem;
      opacity: 0.6;
    }

    p {
      font-size: 1.25rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.gray11};
      margin-bottom: 0.5rem;
      font-family: 'Courier New', monospace;
    }

    span {
      color: ${({ theme }) => theme.colors.gray9};
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 0.6;
      transform: translateX(-50%) scale(1);
    }
    50% {
      opacity: 1;
      transform: translateX(-50%) scale(1.05);
    }
  }
`
