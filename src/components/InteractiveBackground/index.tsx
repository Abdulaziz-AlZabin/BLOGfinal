import { useEffect, useRef } from "react"
import styled from "@emotion/styled"
import { useTheme } from "@emotion/react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
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
      initParticles()
    }

    const initParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 4000)
      particlesRef.current = []
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1
        })
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.fillStyle = "rgba(10, 10, 11, 1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw subtle grid
      const gridSize = 60
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)"
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

      const particles = particlesRef.current
      const mouse = mouseRef.current

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Mouse interaction
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 0.5
          particle.vx -= (dx / distance) * force
          particle.vy -= (dy / distance) * force
        }

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Add friction
        particle.vx *= 0.99
        particle.vy *= 0.99

        // Keep particles within bounds
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(16, 185, 129, 0.6)"
        ctx.fill()

        // Draw connections to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j]
          const dx2 = particle.x - other.x
          const dy2 = particle.y - other.y
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)
          const maxConnectionDistance = 120

          if (distance2 < maxConnectionDistance) {
            const opacity = 1 - distance2 / maxConnectionDistance
            
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity * 0.3})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }

        // Draw connection to mouse if close
        const mouseDistance = Math.sqrt(
          (mouse.x - particle.x) ** 2 + (mouse.y - particle.y) ** 2
        )
        if (mouseDistance < 150) {
          const opacity = 1 - mouseDistance / 150
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(16, 185, 129, ${opacity * 0.5})`
          ctx.lineWidth = 1.5
          ctx.stroke()
        }
      })

      // Draw mouse cursor highlight
      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(16, 185, 129, 0.15)"
      ctx.fill()

      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(16, 185, 129, 0.5)"
      ctx.fill()

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
`
