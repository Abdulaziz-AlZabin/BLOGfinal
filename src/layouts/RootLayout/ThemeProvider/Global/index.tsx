import { Global as _Global, css, useTheme } from "@emotion/react"

export const Global = () => {
  const theme: any = useTheme()

  return (
    <_Global
      styles={css`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background: ${theme.scheme === "dark" 
            ? `linear-gradient(180deg, ${theme.colors.gray1} 0%, #0a0514 50%, #0a0a0b 100%)`
            : theme.colors.gray1};
          background-attachment: fixed;
          color: ${theme.colors.gray12};
          transition: background 0.5s ease, color 0.3s ease;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          position: relative;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button {
          cursor: pointer;
          border: none;
          background: none;
          font-family: inherit;
        }

        input, textarea {
          font-family: inherit;
        }

        /* Custom scrollbar with tech theme */
        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }

        ::-webkit-scrollbar-track {
          background: ${theme.colors.gray2};
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: ${theme.scheme === "dark" 
            ? `linear-gradient(180deg, ${theme.colors.neon}, ${theme.colors.cyber})`
            : theme.colors.gray6};
          border-radius: 10px;
          border: 2px solid ${theme.colors.gray2};
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${theme.scheme === "dark"
            ? `linear-gradient(180deg, ${theme.colors.cyber}, ${theme.colors.purple})`
            : theme.colors.gray7};
          box-shadow: ${theme.scheme === "dark" 
            ? `0 0 10px ${theme.colors.neonGlow}`
            : "none"};
        }

        /* Selection with tech colors */
        ::selection {
          background: ${theme.scheme === "dark" 
            ? theme.colors.neon
            : theme.colors.primary};
          color: ${theme.scheme === "dark" ? "#000" : "white"};
          text-shadow: ${theme.scheme === "dark" 
            ? `0 0 8px ${theme.colors.neonGlow}`
            : "none"};
        }

        /* Focus outline with glow effect */
        :focus-visible {
          outline: 2px solid ${theme.colors.primary};
          outline-offset: 2px;
          box-shadow: ${theme.scheme === "dark" 
            ? `0 0 15px ${theme.colors.neonGlow}`
            : "none"};
        }

        /* Tech-inspired animations */
        @keyframes glitch {
          0%, 100% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
        }

        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @keyframes neonPulse {
          0%, 100% {
            opacity: 1;
            filter: brightness(1);
          }
          50% {
            opacity: 0.8;
            filter: brightness(1.2);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* Smooth page transitions */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Apply fade-in to main content */
        main {
          animation: fadeIn 0.6s ease-out;
        }

        /* Code-like monospace elements */
        code, pre, kbd {
          font-family: 'Courier New', Courier, monospace;
        }
      `}
    />
  )
}
