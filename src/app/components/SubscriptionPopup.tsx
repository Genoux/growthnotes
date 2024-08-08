"use client"
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubscriptionForm from '@/app/components/SubscriptionForm'
import { X } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import Image from 'next/image'

type SubscriptionPopupProps = {
  isOpen: boolean;
  onClose: () => void;
}

const SubscriptionPopup = ({ isOpen, onClose }: SubscriptionPopupProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleSubscriptionSuccess = () => {
    setTimeout(() => {
      onClose()
    }, 1000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            className="relative w-full max-w-4xl bg-off-white rounded-sm overflow-hidden shadow-hard border-[3px]"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 5, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-transparent text-gray-600 hover:bg-primary hover:text-off-white rounded-full"
              aria-label="Close subscription popup"
            >
              <X size={24} />
            </Button>
            <div className="grid grid-cols-3 px-12 py-24 items-center gap-20">
              <div className='flex flex-col items-center gap-8 col-span-2'>
                <div className="w-full flex flex-col gap-3">
                  <h2 className="text-5xl font-bold-condensed text-primary -tracking-[0.175rem] uppercase">
                    Join top marketers for insights that truly move the needle.
                  </h2>
                  <p className="text-md text-orange font-normal">
                    Data-driven strategies trusted by industry leaders.
                  </p>
                </div>
                <SubscriptionForm className="w-full" onSuccess={handleSubscriptionSuccess} />
              </div>
              <div className="ml-auto w-full bg-orange-100">
                <Image 
                  src="/geo-blob-popup.svg" 
                  alt="Growthnotes Geoblob" 
                  width={357} 
                  height={425} 
                  className="w-full object-contain" 
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SubscriptionPopup