import { useEffect, useRef } from "react"
import styled from "@emotion/styled"
import { useTheme } from "@emotion/react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
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

    // Tech colors for particles
    const techColors = [
      theme.colors.neon || "#00ff41",
      theme.colors.cyber || "#00d9ff",
      theme.colors.purple || "#b744ff",
    ]

    // Initialize particles
    const particleCount = 60
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1,
      color: techColors[Math.floor(Math.random() * techColors.length)],
    }))

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Draw grid
    const drawGrid = () => {
      if (!ctx || !canvas) return

      const gridSize = 50
      ctx.strokeStyle = theme.colors.gray4 || "rgba(255, 255, 255, 0.03)"
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

    const animate = () => {
      if (!ctx || !canvas) return

      // Clear with slight fade for trail effect
      ctx.fillStyle = theme.scheme === "dark" 
        ? "rgba(10, 10, 11, 0.1)"
        : "rgba(252, 252, 252, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      if (theme.scheme === "dark") {
        drawGrid()
      }

      particlesRef.current.forEach((particle, index) => {
        // Calculate distance from mouse
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 200

        // Mouse interaction
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          particle.x -= (dx / distance) * force * 3
          particle.y -= (dy / distance) * force * 3
        }

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3
        )
        gradient.addColorStop(0, particle.color)
        gradient.addColorStop(1, "transparent")

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw core particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Draw connections between nearby particles
        particlesRef.current.slice(index + 1).forEach((otherParticle) => {
          const dx2 = particle.x - otherParticle.x
          const dy2 = particle.y - otherParticle.y
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)

          if (distance2 < 120) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            const opacity = 0.15 * (1 - distance2 / 120)
            ctx.strokeStyle = `${particle.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      // Draw mouse glow effect
      const gradient = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        180
      )
      gradient.addColorStop(0, theme.colors.neonGlow || "rgba(0, 255, 65, 0.15)")
      gradient.addColorStop(0.5, theme.colors.cyberGlow || "rgba(0, 217, 255, 0.08)")
      gradient.addColorStop(1, "transparent")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
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
  opacity: ${({ theme }) => theme.scheme === "dark" ? "1" : "0.3"};
`
