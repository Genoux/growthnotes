'use client'
import { useEffect, useRef, ReactNode } from 'react'
import { motion, useSpring, useScroll } from 'framer-motion'

interface ReadingProgressBarProps {
  children: ReactNode
}

const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({
  children,
}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ['start start', 'end end'],
  })

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 500,
    damping: 32,
    restDelta: 0.001,
  })

  useEffect(() => {
    const handleResize = () => scrollYProgress.set(scrollYProgress.get())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [scrollYProgress])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-orange origin-left z-20"
        style={{ scaleX }}
      />
      <div ref={contentRef}>{children}</div>
    </>
  )
}

export default ReadingProgressBar
