'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { navLinks } from '@/app/components/NavigationBar'
import SubscriptionForm from './SubscriptionForm'
import { usePosts } from '@/app/hooks/usePosts'
import { Skeleton } from '@/app/components/ui/skeleton'
import { Post } from '@/app/lib/posts/types'

const Footer = () => {
  const { data: latestPosts, isLoading, error } = usePosts(3)

  return (
    <div>
      <footer className="border-y py-16 md:py-32">
        <div className="container lg:grid flex flex-col grid-cols-2 gap-12 lg:gap-40">
          <div className="flex flex-col items-start gap-6 w-full">
            <Image
              src="/growthnotes.svg"
              alt="Growthnotes Logo"
              width={250}
              height={250}
              className="w-auto h-auto flex object-contain"
            />
            <SubscriptionForm className="w-full md:mx-auto" />
            <div className="flex gap-2 flex-wrap">
              <Link
                href="https://www.instagram.com/growth__notes/"
                target="_blank"
                className="hover:opacity-80"
              >
                <Image
                  src="/socials/instagram.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="w-auto h-auto flex object-contain"
                />
              </Link>
              <Link
                href="https://www.tiktok.com/@growthnotes"
                target="_blank"
                className="hover:opacity-80"
              >
                <Image
                  src="/socials/tiktok.svg"
                  alt="Twitter"
                  width={24}
                  height={24}
                  className="w-auto h-auto flex object-contain"
                />
              </Link>
              <Link
                href="https://www.youtube.com/@growthnotes5756/search"
                target="_blank"
                className="hover:opacity-80"
              >
                <Image
                  src="/socials/youtube.svg"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                  className="w-auto h-auto flex object-contain"
                />
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-12 sm:gap-0 w-full justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-4">Pages</h3>
              <ul className="flex flex-col gap-2">
                {Object.entries(navLinks).map(([href, label]) => (
                  <li key={href} className="hover:opacity-50 transition-all">
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Latest Post</h3>
              {isLoading ? (
                Array(Number(3))
                  .fill(0)
                  .map((_, index) => (
                    <Skeleton
                      key={index}
                      className="w-[228px] h-5 rounded-full bg-neutral-200 mb-2"
                    />
                  ))
              ) : error ? (
                <p>Error loading latest posts</p>
              ) : (
                <ul className="flex flex-col gap-2 w-full">
                  {latestPosts?.map((post: Post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/posts/${post.slug}`}
                        className="hover:opacity-50 transition-all"
                      >
                        {post.title.length > 30
                          ? post.title.substring(0, 30) + '...'
                          : post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </footer>
      <section className="container flex w-full items-center justify-between py-8">
        <p className="text-sm">© All rights reserved – Growthnotes</p>
        <Link href="https://www.inbeat.co/">
          <Image
            src="/madebyinbeat.svg"
            alt="Made by InBeat"
            width={100}
            height={30}
            className="w-auto h-auto flex object-contain"
          />
        </Link>
      </section>
    </div>
  )
}

export default Footer
