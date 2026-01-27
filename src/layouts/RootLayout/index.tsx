import styled from "@emotion/styled"
import { ThemeProvider } from "./ThemeProvider"
import { Header } from "./Header"
import Scripts from "./Scripts"
import useGtagEffect from "./useGtagEffect"
import InteractiveBackground from "src/components/InteractiveBackground"

type Props = {
  children: React.ReactNode
}

export const RootLayout = ({ children }: Props) => {
  useGtagEffect()

  // Always use dark mode
  const scheme = "dark"

  return (
    <ThemeProvider scheme={scheme}>
      <Scripts />
      <InteractiveBackground />
      <StyledWrapper>
        <Header />
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
  position: relative;
  z-index: 1;

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
