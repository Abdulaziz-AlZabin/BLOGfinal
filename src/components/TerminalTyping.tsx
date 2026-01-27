import { useEffect, useState } from "react"
import styled from "@emotion/styled"

interface Props {
  lines: string[]
  typingSpeed?: number
  lineDelay?: number
}

const TerminalTyping: React.FC<Props> = ({ 
  lines, 
  typingSpeed = 50, 
  lineDelay = 500 
}) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsTyping(false)
      return
    }

    const currentLine = lines[currentLineIndex]
    
    if (currentText.length < currentLine.length) {
      const timeout = setTimeout(() => {
        setCurrentText(currentLine.slice(0, currentText.length + 1))
      }, typingSpeed)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLines([...displayedLines, currentLine])
        setCurrentText("")
        setCurrentLineIndex(currentLineIndex + 1)
      }, lineDelay)
      return () => clearTimeout(timeout)
    }
  }, [currentText, currentLineIndex, displayedLines, lines, typingSpeed, lineDelay])

  return (
    <StyledTerminal>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="btn red"></span>
          <span className="btn yellow"></span>
          <span className="btn green"></span>
        </div>
        <div className="terminal-title">terminal</div>
      </div>
      <div className="terminal-body">
        {displayedLines.map((line, index) => (
          <div key={index} className="terminal-line">
            <span className="prompt">$</span> {line}
          </div>
        ))}
        {currentText && (
          <div className="terminal-line">
            <span className="prompt">$</span> {currentText}
            {isTyping && <span className="cursor">_</span>}
          </div>
        )}
      </div>
    </StyledTerminal>
  )
}

export default TerminalTyping

const StyledTerminal = styled.div`
  background: ${({ theme }) => theme.colors.gray2};
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  font-family: 'Courier New', Courier, monospace;
  margin: 2rem 0;

  .terminal-header {
    background: ${({ theme }) => theme.colors.gray3};
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray4};

    .terminal-buttons {
      display: flex;
      gap: 0.5rem;

      .btn {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        
        &.red {
          background: #ff5f56;
        }
        
        &.yellow {
          background: #ffbd2e;
        }
        
        &.green {
          background: #27c93f;
        }
      }
    }

    .terminal-title {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.colors.gray10};
      font-weight: 500;
    }
  }

  .terminal-body {
    padding: 1.5rem;
    min-height: 200px;
    color: #e4e4e7;
    font-size: 0.9375rem;
    line-height: 1.8;

    .terminal-line {
      margin-bottom: 0.5rem;

      .prompt {
        color: ${({ theme }) => theme.colors.primary};
        margin-right: 0.5rem;
        font-weight: 700;
      }

      .cursor {
        display: inline-block;
        animation: blink 1s step-end infinite;
        margin-left: 2px;
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }

  @keyframes blink {
    0%, 50% {
      opacity: 1;
    }
    51%, 100% {
      opacity: 0;
    }
  }
`
