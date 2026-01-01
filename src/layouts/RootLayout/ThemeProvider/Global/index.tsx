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
          background-color: ${theme.colors.gray1};
          color: ${theme.colors.gray12};
          transition: background-color 0.3s ease, color 0.3s ease;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
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

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: ${theme.colors.gray2};
        }

        ::-webkit-scrollbar-thumb {
          background: ${theme.colors.gray6};
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${theme.colors.gray7};
        }

        /* Selection */
        ::selection {
          background: ${theme.colors.primary};
          color: white;
        }

        /* Focus outline */
        :focus-visible {
          outline: 2px solid ${theme.colors.primary};
          outline-offset: 2px;
        }
      `}
    />
  )
}
