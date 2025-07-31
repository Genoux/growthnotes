'use client'

import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { defaultTransition } from '@/app/utils/motionConfig'

export default function Success() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={defaultTransition}
      className="flex flex-col items-center gap-8 py-12"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="bg-primary rounded-full p-2">
          <Check className="w-5 h-5 text-white" />
        </div>

        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-3xl font-bold-condensed">RSVP CONFIRMED!</h2>
          <p className="text-base text-muted-foreground max-w-md">
            Thank you for securing your seat. We look forward to seeing you
            there.
          </p>
        </div>
      </div>
    </motion.div>
  )
}