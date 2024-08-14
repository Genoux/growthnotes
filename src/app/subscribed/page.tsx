'use client'

import React from 'react'
import Link from 'next/link'
import BrandScroll from '@/app/components/BrandScroll'
import { motion } from 'framer-motion'
import { defaultTransition } from '@/app/utils/motionConfig'

export default function Subscribed() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={defaultTransition}
      className="pt-40 pb-32 flex flex-col justify-evenly h-full gap-24"
    >
      <div className="container mx-auto flex flex-col items-center justify-center gap-12">
        <div className="flex flex-col items-center ">
          <h1 className="text-3xl font-bold-condensed mb-4 text-orange">
            Welcome to Growthnotes!
          </h1>
          <p className="text-7xl font-bold-condensed text-center -tracking-[0.275rem]">
            Successfully subscribed!
          </p>
        </div>
        <div className="flex gap-4 flex-wrap">
          <Link
            href="/posts/latest"
            className="bg-primary text-white rounded-full hover:bg-primary/90 text-lg px-5 py-3"
          >
            Latest Issue
          </Link>
          <Link
            href="/"
            className="bg-white text-primary border rounded-full hover:text-primary hover:bg-white/20 text-lg px-5 py-3"
          >
            Home
          </Link>
        </div>
      </div>
      <BrandScroll className="w-full mt-20" />
    </motion.div>
  )
}
