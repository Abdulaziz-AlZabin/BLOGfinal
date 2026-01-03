import { useEffect, useRef } from "react"
import styled from "@emotion/styled"
import { useTheme } from "@emotion/react"

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const theme = useTheme() as any

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Minimal grid-only background for professional look
    const drawGrid = () => {
      if (!ctx || !canvas) return

      const gridSize = 60
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)"
      ctx.lineWidth = 1

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    // Static render - no animations for professional look
    ctx.fillStyle = theme.scheme === "dark" 
      ? "rgba(10, 10, 11, 1)"
      : "rgba(252, 252, 252, 1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    if (theme.scheme === "dark") {
      drawGrid()
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [theme])

  return <StyledCanvas ref={canvasRef} />
}

export default InteractiveBackground

const StyledCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: ${({ theme }) => theme.scheme === "dark" ? "0.3" : "0.15"};
`
