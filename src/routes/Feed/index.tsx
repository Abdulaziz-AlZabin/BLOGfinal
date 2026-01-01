import { useState } from "react"
import styled from "@emotion/styled"
import { FiSearch, FiGrid, FiList } from "react-icons/fi"
import PostCard from "./PostList/PostCard"
import Footer from "./Footer"
import ProfileCard from "./ProfileCard"
import TagList from "./TagList"
import usePosts from "src/hooks/usePosts"
import { CONFIG } from "site.config"

type ViewMode = "grid" | "list"

const Feed: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const posts = usePosts()

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
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="view-toggle">
            <button
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "active" : ""}
              aria-label="Grid view"
            >
              <FiGrid />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "active" : ""}
              aria-label="List view"
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

        {/* Posts Grid/List */}
        <div className="posts-header">
          <h2>Latest Posts</h2>
          <span className="post-count">{filteredPosts.length} posts</span>
        </div>

        <div className={`posts-container ${viewMode}`}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post.id} data={post} viewMode={viewMode} />
            ))
          ) : (
            <div className="no-posts">
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
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      padding: 2rem 0 1.5rem;
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
      max-width: 800px;
      height: 300px;
      background: radial-gradient(
        ellipse at center,
        ${({ theme }) => theme.colors.primary}15 0%,
        transparent 70%
      );
      pointer-events: none;
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
    max-width: 400px;

    @media (max-width: 640px) {
      max-width: 100%;
    }

    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: ${({ theme }) => theme.colors.gray8};
      width: 18px;
      height: 18px;
    }

    .search-input {
      width: 100%;
      padding: 0.875rem 1rem 0.875rem 2.75rem;
      border: 1px solid ${({ theme }) => theme.colors.gray4};
      border-radius: 12px;
      background: ${({ theme }) => theme.colors.gray2};
      color: ${({ theme }) => theme.colors.gray12};
      font-size: 0.9375rem;
      transition: all 0.2s ease;

      &::placeholder {
        color: ${({ theme }) => theme.colors.gray8};
      }

      &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
        background: ${({ theme }) => theme.colors.gray1};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
      }
    }
  }

  .view-toggle {
    display: flex;
    background: ${({ theme }) => theme.colors.gray3};
    border-radius: 10px;
    padding: 4px;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 36px;
      border-radius: 8px;
      color: ${({ theme }) => theme.colors.gray8};
      transition: all 0.2s ease;

      &.active {
        background: ${({ theme }) => theme.colors.gray1};
        color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      &:not(.active):hover {
        color: ${({ theme }) => theme.colors.gray11};
      }

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }

  .posts-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin: 2rem 0 1.5rem;

    h2 {
      font-size: 1.5rem;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.gray12};
    }

    .post-count {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.colors.gray9};
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
      gap: 1rem;
    }
  }

  .no-posts {
    grid-column: 1 / -1;
    text-align: center;
    padding: 4rem 2rem;
    background: ${({ theme }) => theme.colors.gray2};
    border-radius: 16px;

    p {
      font-size: 1.25rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.gray11};
      margin-bottom: 0.5rem;
    }

    span {
      color: ${({ theme }) => theme.colors.gray9};
    }
  }
`
