"use client"

import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { X } from 'lucide-react'
import SubscriptionForm from '@/app/components/SubscriptionForm'
import clsx from 'clsx'


type SubscriptionBannerProps = {
  className?: string
  align?: 'left' | 'center'
}

const SubscriptionBanner = ({ className = '', align = 'center' }: SubscriptionBannerProps) => {
  return (
    <div className={clsx(
      className,
      'bg-yellow py-12 px-6 md:py-16 lg:px-12 shadow-hard outline outline-4 outline-primary rounded-sm relative w-full text-center',
    )}>
      <div className='max-w-2xl md:max-w-4xl mx-auto flex gap-8 flex-col text-center'>
        <h2 className="text-3xl lg:text-4xl px-0 md:px-10 font-bold-condensed uppercase">
          Join 70,000+ e-commerce experts that get deep marketing insights every week.
        </h2>
        <div className='flex flex-col gap-6 justify-center'>
          <SubscriptionForm className='w-full sm:w-4/5 md:w-3/4 mx-auto' />
          <p className="text-lg md:text-xl font-normal tracking-tight">Join us, and turn insight into impact.</p>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionBanner