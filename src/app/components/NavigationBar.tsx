'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Badge } from '@/app/components/ui/badge'
import SubscriptionPopup from '@/app/components/SubscriptionPopup'
import clsx from 'clsx'

type NavLinkItem = {
  href: string
  label: string
}

export const navLinks: NavLinkItem[] = [
  { href: '/', label: 'Home' },
  { href: '/podcast', label: 'Podcast' },
  { href: '/posts', label: 'Archive' },
  { href: '/posts/latest', label: 'Latest Issue' },
]

type NavLinkProps = {
  href: string
  label: string
  active: boolean
  onClick?: () => void
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, active, onClick }) => (
  <Link
    href={href}
    className={clsx(
      'text-gray-900 px-3 lg:px-4 h-11 flex items-center justify-center rounded-full w-fit transition-all text-base',
      active
        ? 'bg-black bg-opacity-10 cursor-auto'
        : 'font-normal border-opacity-0 hover:bg-black hover:bg-opacity-10'
    )}
    onClick={onClick}
  >
    {label}
    {href === '/podcast' && <Badge className="bg-orange ml-2">NEW</Badge>}
  </Link>
)

const useNavbarVisibility = () => {
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY
      setIsVisible(
        currentScrollY < lastScrollY.current ||
          currentScrollY === 0 ||
          !(currentScrollY > 100 && currentScrollY > lastScrollY.current)
      )
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', controlNavbar)
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [])

  return isVisible
}

export default function NavigationBar() {
  const [showPopup, setShowPopup] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const pathname = usePathname()
  const isVisible = useNavbarVisibility()

  const handleOpenPopup = useCallback(() => setShowPopup(true), [])
  const handleClosePopup = useCallback(() => setShowPopup(false), [])
  const toggleMobileMenu = useCallback(
    () => setShowMobileMenu(prev => !prev),
    []
  )

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? 'hidden' : 'unset'
  }, [showMobileMenu])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowMobileMenu(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <motion.nav
        className={clsx(
          'fixed top-0 left-0 right-0 z-30 backdrop-blur-md bg-off-white/80 border-b py-4',
          isVisible ? 'translate-y-0' : '-translate-y-full'
        )}
        initial={false}
        animate={{ y: isVisible ? 0 : '-100%' }}
        transition={{ duration: 0.3 }}
      >
        <div className="container flex w-full items-center justify-between h-12">
          <Link href="/" className="flex items-center">
            <Image
              src="/growthnotes.svg"
              alt="GrowthNotes Logo"
              width={150}
              height={40}
              priority
              className="w-auto h-auto flex my-auto object-contain"
            />
          </Link>
          <div className="hidden md:flex items-stretch space-x-2">
            {navLinks.map(({ href, label }) => (
              <NavLink
                key={href}
                href={href}
                label={label}
                active={pathname === href}
              />
            ))}
            <motion.button
              onClick={handleOpenPopup}
              className="bg-orange text-white font-medium px-4 rounded-full flex items-center h-11 text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </div>
          <motion.div
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-900 cursor-pointer w-10 h-10 rounded-full my-auto p-2 flex items-center justify-center"
            whileHover={{ backgroundColor: '#000', color: '#fff' }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="h-6 w-6" />
          </motion.div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-off-white flex flex-col"
          >
            <div className="flex w-full items-center justify-between py-4 border-b">
              <div className="container flex items-center justify-between h-12">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/growthnotes.svg"
                    alt="GrowthNotes Logo"
                    width={150}
                    height={40}
                    priority
                    className="w-auto h-auto flex my-auto object-contain"
                  />
                </Link>
                <motion.button
                  onClick={toggleMobileMenu}
                  className="md:hidden text-gray-900 rounded-full p-2 flex items-center justify-center"
                  whileHover={{ backgroundColor: '#000', color: '#fff' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center flex-grow space-y-4">
              {navLinks.map(({ href, label }) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <NavLink
                    href={href}
                    label={label}
                    active={pathname === href}
                    onClick={toggleMobileMenu}
                  />
                </motion.div>
              ))}
              <motion.button
                onClick={() => {
                  toggleMobileMenu()
                  handleOpenPopup()
                }}
                className="bg-orange text-white text-md font-medium px-6 py-3 rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SubscriptionPopup isOpen={showPopup} onClose={handleClosePopup} />
    </>
  )
}
