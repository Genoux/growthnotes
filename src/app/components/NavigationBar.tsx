'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useMemo, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import SubscriptionPopup from '@/app/components/SubscriptionPopup';
import clsx from 'clsx';

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Archive" },
  { href: "/posts/latest", label: "Latest Issue" },
] as const;

export default function NavigationBar() {
  const [showPopup, setShowPopup] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const pathname = usePathname();

  const activeLink = useMemo(() => {
    if (pathname === '/') return '/';
    if (pathname.startsWith('/posts') && pathname !== '/posts/latest') return '/posts';
    return pathname;
  }, [pathname]);

  const handleOpenPopup = useCallback(() => setShowPopup(true), []);
  const handleClosePopup = useCallback(() => setShowPopup(false), []);
  const toggleMobileMenu = useCallback(() => setShowMobileMenu(prev => !prev), []);

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showMobileMenu])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowMobileMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <nav className="top-0 left-0 right-0 z-50 backdrop-blur-sm bg-off-white border-b py-4">
        <div className='container flex w-full items-stretch justify-between h-10'>
          <Link href="/" className='flex items-center'>
            <Image
              src="/growthnotes.svg"
              alt="GrowthNotes Logo"
              width={150}
              height={40}
              priority
              className='w-auto h-auto flex my-auto object-contain'
            />
          </Link>
          <div className="hidden md:flex items-stretch space-x-3">
            {navLinks.map(({ href, label }) => (
              <NavLink key={href} href={href} active={activeLink === href}>
                {label}
              </NavLink>
            ))}
            <button
              onClick={handleOpenPopup}
              className="bg-orange hover:opacity-95 text-white text-md font-medium px-4 rounded-full flex items-center transition-transform hover:scale-105 active:scale-95"
            >
              Subscribe
            </button>
          </div>
          <motion.div
            onClick={toggleMobileMenu}
            className={clsx(
              "md:hidden text-gray-900 cursor-pointer hover:bg-primary hover:text-white rounded-full p-2 flex items-center justify-center",
            )}
          >
            <Menu className="h-6 w-6" />
          </motion.div>
        </div>
      </nav>

      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-off-white flex flex-col"
          >

            <div className="flex w-full items-center justify-between py-4 border-b ">
              <div className='container flex items-center justify-between'>
              <Link href="/" className='flex items-center'>
                <Image
                  src="/growthnotes.svg"
                  alt="GrowthNotes Logo"
                  width={150}
                  height={40}
                  priority
                  className='w-auto h-auto flex my-auto object-contain'
                />
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="md:hidden text-gray-900 hover:bg-primary hover:text-white rounded-full p-2 flex items-center justify-center"
              >
                <X className="h-6 w-6" />
              </button>
              </div>

            </div>
            <div className="flex flex-col items-center justify-center flex-grow space-y-6">
              {navLinks.map(({ href, label }) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <NavLink href={href} active={activeLink === href} onClick={toggleMobileMenu}>
                    {label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.button
                onClick={() => {
                  toggleMobileMenu();
                  handleOpenPopup();
                }}
                className="bg-orange hover:opacity-95 text-white text-md font-medium px-6 py-3 rounded-full transition-transform hover:scale-105 active:scale-95"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SubscriptionPopup isOpen={showPopup} onClose={handleClosePopup} />
    </>
  );
}

type NavLinkProps = {
  href: string;
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

const NavLink = ({ href, active, children, onClick }: NavLinkProps) => (
  <Link
    href={href}
    prefetch={true}
    className={`
      text-gray-900 px-3 py-2 flex items-center justify-center rounded-full w-fit
      ${active
        ? 'bg-black bg-opacity-10 cursor-auto'
        : 'font-normal border-opacity-0 hover:bg-black hover:bg-opacity-10'}
    `}
    onClick={onClick}
  >
    {children}
  </Link>
);