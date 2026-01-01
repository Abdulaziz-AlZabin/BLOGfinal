import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { ThemeProvider } from "./ThemeProvider"
import { Header } from "./Header"
import { CONFIG } from "site.config"
import { SchemeType } from "src/types"
import { getCookie, setCookie } from "cookies-next"
import Scripts from "./Scripts"
import useGtagEffect from "./useGtagEffect"

type Props = {
  children: React.ReactNode
}

export const RootLayout = ({ children }: Props) => {
  const [scheme, setScheme] = useState<SchemeType>(CONFIG.blog.scheme as SchemeType)

  useGtagEffect()

  useEffect(() => {
    const savedScheme = getCookie("scheme") as SchemeType | undefined
    if (savedScheme) {
      setScheme(savedScheme)
    } else if (CONFIG.blog.scheme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setScheme(prefersDark ? "dark" : "light")
    }
  }, [])

  const toggleScheme = () => {
    const newScheme = scheme === "light" ? "dark" : "light"
    setScheme(newScheme)
    setCookie("scheme", newScheme, { maxAge: 60 * 60 * 24 * 365 })
  }

  return (
    <ThemeProvider scheme={scheme}>
      <Scripts />
      <StyledWrapper>
        <Header scheme={scheme} toggleScheme={toggleScheme} />
        <main className="main-content">
          {children}
        </main>
      </StyledWrapper>
    </ThemeProvider>
  )
}

const StyledWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .main-content {
    flex: 1;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1.5rem;

    @media (max-width: 768px) {
      padding: 0 1rem;
    }
  }
`
