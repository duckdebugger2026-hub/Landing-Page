import { useEffect, useRef } from "react"

// A quiet dot grid behind the page. Dots near the pointer grow, warm to
// marigold and lean away; clicking empty space sends a ripple through the grid;
// the grid drifts a little on scroll. It only animates while something is
// happening, and stays still for people who prefer reduced motion.

const SPACING = 30
const RADIUS = 150
const MARIGOLD = [229, 160, 58]
const INTERACTIVE = "a, button, input, textarea, select, label, [role='button'], [role='tab'], [role='radio'], [role='checkbox'], [role='switch']"

function readColours() {
  const style = getComputedStyle(document.documentElement)
  const rgb = style.getPropertyValue("--dot").trim().split(/\s+/).map(Number)
  const alpha = parseFloat(style.getPropertyValue("--dot-alpha")) || 0.12
  return { rgb: rgb.length === 3 ? rgb : [42, 22, 48], alpha }
}

export default function DotField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches

    let width = 0
    let height = 0
    let colours = readColours()
    let frame = 0
    let lastActive = 0
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 }
    const ripples = []

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      schedule()
    }

    function draw(now) {
      frame = 0
      // Ease the drawn pointer toward the real one for a soft, trailing feel.
      pointer.x += (pointer.tx - pointer.x) * 0.18
      pointer.y += (pointer.ty - pointer.y) * 0.18

      const drift = reduced ? 0 : (window.scrollY * 0.12) % SPACING
      const [r, g, b] = colours.rgb
      ctx.clearRect(0, 0, width, height)

      for (let i = ripples.length - 1; i >= 0; i--) {
        if (now - ripples[i].t > 1600) ripples.splice(i, 1)
      }

      const base = []
      for (let y = -drift; y < height + SPACING; y += SPACING) {
        for (let x = SPACING / 2; x < width; x += SPACING) {
          const dx = x - pointer.x
          const dy = y - pointer.y
          const dist = Math.hypot(dx, dy)
          let lift = dist < RADIUS ? 1 - dist / RADIUS : 0
          lift = lift * lift * (3 - 2 * lift)

          for (const ripple of ripples) {
            const age = (now - ripple.t) / 1600
            const front = age * 520
            const d = Math.hypot(x - ripple.x, y - ripple.y)
            const band = Math.exp(-(((d - front) / 34) ** 2))
            lift = Math.max(lift, band * (1 - age))
          }

          if (lift < 0.02) {
            base.push(x, y)
            continue
          }
          const push = lift * 7
          const px = dist ? x + (dx / dist) * push : x
          const py = dist ? y + (dy / dist) * push : y
          const mix = (c, m) => Math.round(c + (m - c) * lift)
          ctx.fillStyle = `rgba(${mix(r, MARIGOLD[0])}, ${mix(g, MARIGOLD[1])}, ${mix(b, MARIGOLD[2])}, ${colours.alpha + lift * 0.6})`
          ctx.beginPath()
          ctx.arc(px, py, 1.1 + lift * 2.4, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // All the resting dots in a single path: cheap to draw.
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${colours.alpha})`
      ctx.beginPath()
      for (let i = 0; i < base.length; i += 2) {
        ctx.moveTo(base[i] + 1.1, base[i + 1])
        ctx.arc(base[i], base[i + 1], 1.1, 0, Math.PI * 2)
      }
      ctx.fill()

      const settling = Math.abs(pointer.tx - pointer.x) + Math.abs(pointer.ty - pointer.y) > 0.5
      if (ripples.length || settling || now - lastActive < 400) schedule()
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(draw)
    }

    function onPointerMove(e) {
      pointer.tx = e.clientX
      pointer.ty = e.clientY
      if (pointer.x < -9000) {
        pointer.x = e.clientX
        pointer.y = e.clientY
      }
      lastActive = performance.now()
      schedule()
    }

    function onPointerLeave() {
      pointer.tx = -9999
      pointer.ty = -9999
      pointer.x = -9999
      pointer.y = -9999
      schedule()
    }

    function onPointerDown(e) {
      if (e.target.closest(INTERACTIVE)) return
      ripples.push({ x: e.clientX, y: e.clientY, t: performance.now() })
      schedule()
    }

    // Repaint with new colours when the theme changes.
    const themeObserver = new MutationObserver(() => {
      setTimeout(() => {
        colours = readColours()
        schedule()
      }, 50)
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("scroll", schedule, { passive: true })
    if (!reduced) {
      if (finePointer) {
        window.addEventListener("pointermove", onPointerMove, { passive: true })
        document.documentElement.addEventListener("pointerleave", onPointerLeave)
      }
      window.addEventListener("pointerdown", onPointerDown, { passive: true })
    }

    return () => {
      cancelAnimationFrame(frame)
      themeObserver.disconnect()
      window.removeEventListener("resize", resize)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("pointermove", onPointerMove)
      document.documentElement.removeEventListener("pointerleave", onPointerLeave)
      window.removeEventListener("pointerdown", onPointerDown)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 -z-10" />
}
