'use client'
import { useState, FormEvent } from 'react'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { submitSubscription } from '@/app/lib/subscription/actions'
import { useToast } from '@/app/components/ui/use-toast'
import { CheckIcon } from 'lucide-react'
import clsx from 'clsx'
import { useSubscription } from '@/app/contexts/SubscriptionContext'
import { LoadingCircle } from '@/app/components/LoadingCircle'
import { motion, AnimatePresence } from 'framer-motion'

function FormContent({
  email,
  setEmail,
}: {
  email: string
  setEmail: (value: string) => void
}) {
  const { isSubscribed, isLoading } = useSubscription()
  return (
    <div className="flex gap-2 h-14 mx-auto">
      <Input
        type="email"
        name="email"
        placeholder="Enter your email"
        className="placeholder:text-sm sm:placeholder:text-base pl-4 md:pl-6 rounded-full h-full outline outline-[2px] outline-primary text-base focus:outline-[2px] text-primary"
        value={email}
        disabled={isSubscribed || isLoading}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <Button
        type="submit"
        disabled={isLoading}
        className={`rounded-full text-md font-medium px-6 lg:px-12 min-w-32 lg:min-w-44 h-full ${isSubscribed ? 'pointer-events-none' : ''}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isLoading ? 'loading' : isSubscribed ? 'check' : 'subscribe'}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            {isLoading ? (
              <LoadingCircle size={18} thickness={2} color="currentColor" />
            ) : isSubscribed ? (
              <CheckIcon className="h-6 w-6" />
            ) : (
              'Subscribe'
            )}
          </motion.div>
        </AnimatePresence>
      </Button>
    </div>
  )
}

interface SubscriptionFormProps {
  className?: string
  onSuccess?: () => void
}

export default function SubscriptionForm({
  className = '',
  onSuccess,
}: SubscriptionFormProps) {
  const [email, setEmail] = useState('')
  const { isSubscribed, setIsSubscribed, setIsLoading } = useSubscription()
  const { toast } = useToast()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubscribed) return
    setIsLoading(true)
    try {
      const formData = new FormData(event.currentTarget)
      const result = await submitSubscription(formData)
      if (result.success) {
        setEmail('')
        setIsSubscribed(true)
        toast({
          title: 'Thanks for subscribing!',
          description: 'We’ve sent you an email to confirm your subscription',
          className: 'shadow-hard border-[3px] bg-yellow text-center',
        })
        setTimeout(() => {
          setIsSubscribed(false)
        }, 5000)

        if (onSuccess) {
          onSuccess()
        }
      } else {
        throw new Error(result.error?.message || 'Subscription failed')
      }
    } catch (error) {
      toast({
        title: 'Subscription Failed',
        description:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
        variant: 'destructive',
        className: 'bg-red-500 border-primary border-[3px] text-center',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <FormContent email={email} setEmail={setEmail} />
    </form>
  )
}
