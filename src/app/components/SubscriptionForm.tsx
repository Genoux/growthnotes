'use client'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { submitSubscription } from '@/app/lib/subscription/actions'
import { useToast } from "@/components/ui/use-toast"
import { CheckIcon } from "lucide-react"

function SubmitButton({ showCheck }: { showCheck: boolean }) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className={`rounded-full font-medium h-full min-w-[120px] ${showCheck ? 'bg-primary text-primary-foreground pointer-events-none' : ''}`}
    >
      {pending && !showCheck ? 'Subscribing...' : (showCheck ? <CheckIcon className="h-5 w-5" /> : 'Subscribe')}
    </Button>
  )
}

interface SubscriptionFormProps {
  onSubmitError?: (error: string) => void
}

export function SubscriptionForm({ onSubmitError }: SubscriptionFormProps) {
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
    <form action={handleSubmit} className="flex gap-2 h-12">
      {!showCheck && (
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          className='rounded-full h-full'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      )}

      <SubmitButton showCheck={showCheck} />
    </form>
  )
}