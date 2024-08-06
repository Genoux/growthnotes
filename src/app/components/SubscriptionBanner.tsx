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
  // const [isVisible, setIsVisible] = useState(true)
  // if (!isVisible) return null

  return (
    <div className={clsx(
      className,
      'bg-yellow py-24 px-6 shadow-hard outline outline-4 outline-primary rounded-sm relative',
      { 'text-center': align === 'center' }
    )}>
      {/* <Button
        onClick={() => setIsVisible(false)}
        className="absolute top-4 right-4 p-2 bg-transparent text-primary hover:bg-transparent hover:opacity-50"
        aria-label="Close subscription banner"
      >
        <X size={24} />
      </Button> */}
      <div className={clsx(
        'max-w-3xl mx-auto flex gap-12',
        {
          'flex-col text-left': align === 'left',
          'flex-col text-center': align === 'center'
        }
      )}>
        <h2 className="text-4xl font-medium">
          Join 70,000+ e-commerce experts that get deep marketing insights every week.
        </h2>
        <div className='flex flex-col gap-6 justify-center'>
          <SubscriptionForm className={clsx({ 'w-5/6 mx-auto': align === 'center' })} />
          <p className="text-2xl font-normal tracking-tight">Join us, and turn insight into impact.</p>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionBanner