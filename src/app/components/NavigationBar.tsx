'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Archive" },
  { href: "/posts/latest", label: "Latest Issue" },
] as const;

export default function NavigationBar() {
  const pathname = usePathname();
  const activeLink = useMemo(() => {
    if (pathname === '/') return '/';
    if (pathname.startsWith('/posts') && pathname !== '/posts/latest') return '/posts';
    return pathname;
  }, [pathname]);

  return (
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
        <div className="flex items-stretch space-x-3">
          {navLinks.map(({ href, label }) => (
            <NavLink key={href} href={href} active={activeLink === href}>
              {label}
            </NavLink>
          ))}
          <Link
            href="/subscribe"
            className="bg-orange hover:opacity-95 text-white text-md font-medium px-4 rounded-full flex items-center transition-transform hover:scale-105 active:scale-95"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </nav>
  );
}

type NavLinkProps = {
  href: string;
  active: boolean;
  children: React.ReactNode;
};

const NavLink = ({ href, active, children }: NavLinkProps) => (
  <Link
    href={href}
    prefetch={true}
    className={`
      text-gray-900 px-3 flex items-center rounded-full
      ${active
        ? 'bg-black bg-opacity-10 cursor-auto'
        : 'font-normal border-opacity-0 hover:bg-black hover:bg-opacity-10'}
    `}
  >
    {children}
  </Link>
);