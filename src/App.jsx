import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { Toaster } from '@/components/ui/sonner'
import { useTheme } from '@/hooks/useTheme'
import Home from '@/pages/Home'
// Legal pages are rarely visited, so they load on demand.
const Privacy = lazy(() => import('@/pages/Privacy'))
const Refunds = lazy(() => import('@/pages/Refunds'))
const Terms = lazy(() => import('@/pages/Terms'))

// Start each page at the top, unless the URL points to a section like /#faq.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id) document.getElementById(id)?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const { theme } = useTheme()
  return (
    <>
      <ScrollToTop />
      <Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refunds" element={<Refunds />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
      <Toaster theme={theme} position="top-center" />
    </>
  )
}
