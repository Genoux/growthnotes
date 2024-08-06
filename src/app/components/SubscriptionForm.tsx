// TODO: When a user subscribe and showCheck is true; All the other form should display as showCheck

'use client'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { submitSubscription } from '@/app/lib/subscription/actions'
import { useToast } from "@/app/components/ui/use-toast"
import { CheckIcon } from "lucide-react"
import clsx from 'clsx'

function SubmitButton({ showCheck }: { showCheck: boolean }) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className={`rounded-full text-lg font-medium h-full min-w-[150px] ${showCheck ? 'outline outline-[3px] outline-primary  w-full bg-transparent text-primary-foreground pointer-events-none' : ''}`}
    >
      {pending && !showCheck ? 'Subscribing...' : (showCheck ? <CheckIcon className="h-6 w-6 text-primary" /> : 'Subscribe')}
    </Button>
  )
}

interface SubscriptionFormProps {
  onSubmitError?: (error: string) => void
  className?: string
}

export default function SubscriptionForm({ onSubmitError, className = '' }: SubscriptionFormProps) {
  const [email, setEmail] = useState('')
  const [showCheck, setShowCheck] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (formData: FormData) => {
    if (showCheck) return
    const result = await submitSubscription(formData)
    if (result.success) {
      setEmail('')
      setShowCheck(true)
      toast({
        title: "Subscribed!",
        description: "You've successfully subscribed to our newsletter.",
        className: "shadow-hard border-2 bg-yellow text-center",
      })
    } else {
      onSubmitError?.(result.error || 'An error occurred')
    }
  }

  return (
    <form action={handleSubmit} className={clsx('flex gap-2 h-14', className)}>
      {!showCheck && (
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          className='rounded-full h-full outline outline-[3px] outline-primary text-base focus:outline-[3px] text-primary pl-6'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      )}
      <SubmitButton showCheck={showCheck} />
    </form>
  )
}