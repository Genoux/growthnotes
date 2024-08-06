'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Archive" },
  { href: "/posts/latest", label: "Latest Issue" },
];

export default function NavigationBar() {
  const pathname = usePathname();
  return (
    <nav className="py-4 top-0 left-0 right-0 z-50 backdrop-blur-sm bg-off-white border-b">
      <div className='container flex w-full items-center justify-between'>
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/growthnotes.svg"
              alt="GrowthNotes Logo"
              width={150}
              height={40}
              priority
              className='w-auto h-auto flex mx-auto object-contain'
            />
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={true}
              className={`${pathname === link.href
                ? 'bg-black bg-opacity-10 border-opacity-100 cursor-auto'
                : 'font-normal'
                } text-gray-900 px-4 py-2 rounded-full border border-black border-opacity-0 hover:border-opacity-100`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/subscribe"
            className="bg-orange hover:opacity-95 text-white font-normal py-2 px-4 rounded-full"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </nav>
  );
}