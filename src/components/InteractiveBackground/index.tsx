import { useEffect, useRef } from "react"
import styled from "@emotion/styled"
import { useTheme } from "@emotion/react"

interface Shape {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  type: 'circle' | 'square' | 'triangle'
}

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shapesRef = useRef<Shape[]>([])
  const animationRef = useRef<number>()
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

    // Create subtle floating shapes
    const shapeCount = 15
    shapesRef.current = Array.from({ length: shapeCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 30 + 20,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.03 + 0.01,
      type: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle',
    }))

    const drawShape = (shape: Shape) => {
      ctx.save()
      ctx.globalAlpha = shape.opacity
      ctx.strokeStyle = theme.colors.primary
      ctx.lineWidth = 1

      if (shape.type === 'circle') {
        ctx.beginPath()
        ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2)
        ctx.stroke()
      } else if (shape.type === 'square') {
        ctx.strokeRect(shape.x - shape.size, shape.y - shape.size, shape.size * 2, shape.size * 2)
      } else if (shape.type === 'triangle') {
        ctx.beginPath()
        ctx.moveTo(shape.x, shape.y - shape.size)
        ctx.lineTo(shape.x - shape.size, shape.y + shape.size)
        ctx.lineTo(shape.x + shape.size, shape.y + shape.size)
        ctx.closePath()
        ctx.stroke()
      }
      ctx.restore()
    }

    // Static grid
    const drawGrid = () => {
      if (!ctx || !canvas) return

      const gridSize = 60
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)"
      ctx.lineWidth = 1

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    const animate = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.fillStyle = theme.scheme === "dark" 
        ? "rgba(10, 10, 11, 1)"
        : "rgba(252, 252, 252, 1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw static grid
      if (theme.scheme === "dark") {
        drawGrid()
      }

      // Draw and update shapes
      shapesRef.current.forEach((shape) => {
        // Update position
        shape.x += shape.speedX
        shape.y += shape.speedY

        // Wrap around edges
        if (shape.x < -shape.size) shape.x = canvas.width + shape.size
        if (shape.x > canvas.width + shape.size) shape.x = -shape.size
        if (shape.y < -shape.size) shape.y = canvas.height + shape.size
        if (shape.y > canvas.height + shape.size) shape.y = -shape.size

        drawShape(shape)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
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
  opacity: ${({ theme }) => theme.scheme === "dark" ? "0.4" : "0.2"};
`
