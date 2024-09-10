'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useMemo, useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import SubscriptionPopup from '@/app/components/SubscriptionPopup'
import clsx from 'clsx'

export const navLinks = {
  '/': 'Home',
  '/podcast': 'Podcast',
  '/posts': 'Archive',
  '/posts/latest': 'Latest Issue',
}

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

const useResponsiveMenu = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    const handleResize = () =>
      window.innerWidth >= 768 && setShowMobileMenu(false)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { showMobileMenu, setShowMobileMenu }
}

type NavLinkProps = {
  href: string
  active: boolean
  children: React.ReactNode
  onClick?: () => void
}

const NavLink = ({ href, active, children, onClick }: NavLinkProps) => (
  <Link
    href={href}
    className={clsx(
      'text-gray-900 px-4 h-12 flex items-center justify-center rounded-full w-fit transition-all',
      active
        ? 'bg-black bg-opacity-10 cursor-auto'
        : 'font-normal border-opacity-0 hover:bg-black hover:bg-opacity-10'
    )}
    onClick={onClick}
  >
    {children}
  </Link>
)

export default function NavigationBar() {
  const [uiState, setUiState] = useState({
    showPopup: false,
  })
  const isVisible = useNavbarVisibility()
  const { showMobileMenu, setShowMobileMenu } = useResponsiveMenu()
  const pathname = usePathname()

  const activeLink = useMemo(() => {
    if (pathname === '/') return '/'
    if (pathname.startsWith('/posts'))
      return pathname === '/posts/latest' ? pathname : '/posts'
    return pathname
  }, [pathname])

  const handleOpenPopup = useCallback(
    () => setUiState(prev => ({ ...prev, showPopup: true })),
    []
  )
  const handleClosePopup = useCallback(
    () => setUiState(prev => ({ ...prev, showPopup: false })),
    []
  )
  const toggleMobileMenu = useCallback(
    () => setShowMobileMenu(prev => !prev),
    [setShowMobileMenu]
  )

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? 'hidden' : 'unset'
  }, [showMobileMenu])

  return (
    <>
      <div className="bg-off-white w-full h-12"></div>
      <motion.nav
        className={clsx(
          'fixed top-0 left-0 right-0 z-30 backdrop-blur-md bg-off-white/80 border-b py-4',
          isVisible ? 'translate-y-0' : '-translate-y-full'
        )}
        initial={false}
        animate={{ y: isVisible ? 0 : '-100%' }}
        transition={{ duration: 0.3 }}
      >
        <div className="container flex w-full items-stretch justify-between h-12">
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
            {Object.entries(navLinks).map(([href, label]) =>
              href === '/podcast' ? (
                <div key={href} className="flex items-center">
                  <NavLink href={href} active={activeLink === href}>
                    {label}
                    <span className="bg-[#FF6635] text-white text-[14px] ml-[6px] font-bold px-[10px] py-[4px] rounded-[28px] select-none flex justify-center items-center">
                      NEW
                    </span>
                  </NavLink>
                </div>
              ) : (
                <NavLink key={href} href={href} active={activeLink === href}>
                  {label}
                </NavLink>
              )
            )}
            <motion.button
              onClick={handleOpenPopup}
              className="bg-orange text-white text-md font-medium px-4 rounded-full flex items-center"
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
              {Object.entries(navLinks).map(([href, label]) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <NavLink
                    href={href}
                    active={activeLink === href}
                    onClick={toggleMobileMenu}
                  >
                    {label}
                  </NavLink>
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

      <SubscriptionPopup
        isOpen={uiState.showPopup}
        onClose={handleClosePopup}
      />
    </>
  )
}
