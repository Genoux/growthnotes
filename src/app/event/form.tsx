'use client'
import { useState, FormEvent } from 'react'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { useToast } from '@/app/components/ui/use-toast'
import { CheckIcon } from 'lucide-react'
import { LoadingCircle } from '@/app/components/LoadingCircle'
import { motion, AnimatePresence } from 'framer-motion'

interface FormData {
  firstName: string
  lastName: string
  email: string
  company: string
  phone: string
  dietaryRestrictions: string
  message: string
}

export default function EventRSVPForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    dietaryRestrictions: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitted) return

    setIsLoading(true)

    try {
      // Simulate API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000))

      // For now, just show success message
      setIsSubmitted(true)
      toast({
        title: 'RSVP Confirmed!',
        description:
          'Thank you for securing your seat. We look forward to seeing you there.',
        className: 'shadow-hard outline outline-primary bg-yellow text-center',
      })

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          phone: '',
          dietaryRestrictions: '',
          message: '',
        })
      }, 5000)
    } catch (error) {
      toast({
        title: 'RSVP Failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
        className: 'bg-red-500 outline outline-primary text-center',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-2">
            First Name <span className="text-orange">*</span>
          </label>
          <Input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={e => handleInputChange('firstName', e.target.value)}
            disabled={isSubmitted || isLoading}
            required
            className="border border-primary focus:border-primary focus:border-2 focus:outline-none focus:ring-0"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-2">
            Last Name <span className="text-orange">*</span>
          </label>
          <Input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={e => handleInputChange('lastName', e.target.value)}
            disabled={isSubmitted || isLoading}
            required
            className="border border-primary focus:border-primary focus:border-2 focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email <span className="text-orange">*</span>
        </label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={e => handleInputChange('email', e.target.value)}
          disabled={isSubmitted || isLoading}
          required
          className="border border-primary focus:border-primary focus:border-2 focus:outline-none focus:ring-0"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-2">
          Company
        </label>
        <Input
          id="company"
          type="text"
          value={formData.company}
          onChange={e => handleInputChange('company', e.target.value)}
          disabled={isSubmitted || isLoading}
          className="border border-primary focus:border-primary focus:border-2 focus:outline-none focus:ring-0"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Phone (For day of updates)
        </label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={e => handleInputChange('phone', e.target.value)}
          disabled={isSubmitted || isLoading}
          className="border border-primary focus:border-primary focus:border-2 focus:outline-none focus:ring-0"
        />
      </div>

      <div>
        <label
          htmlFor="dietaryRestrictions"
          className="block text-sm font-medium mb-2"
        >
          Do you have any dietary restrictions?
        </label>
        <Input
          id="dietaryRestrictions"
          type="text"
          value={formData.dietaryRestrictions}
          onChange={e =>
            handleInputChange('dietaryRestrictions', e.target.value)
          }
          disabled={isSubmitted || isLoading}
          className="border border-primary focus:border-primary focus:border-2 focus:outline-none focus:ring-0"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message <span className="text-orange">*</span>
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={e => handleInputChange('message', e.target.value)}
          disabled={isSubmitted || isLoading}
          required
          rows={4}
          className="flex w-full rounded-md border border-primary bg-background px-3 py-2 text-sm ring-offset-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-primary focus:border-2 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <div className="text-center py-6">
        <div className="flex flex-col gap-6 items-center">
          <Button
            type="submit"
            disabled={isLoading}
            className={`bg-primary text-white rounded-full text-lg font-medium px-12 py-3 h-auto ${
              isSubmitted ? 'pointer-events-none' : ''
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isLoading ? 'loading' : isSubmitted ? 'check' : 'rsvp'}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
              >
                {isLoading ? (
                  <LoadingCircle size={20} thickness={2} color="currentColor" />
                ) : isSubmitted ? (
                  <CheckIcon className="h-6 w-6" />
                ) : (
                  'RSVP'
                )}
              </motion.div>
            </AnimatePresence>
          </Button>
          <div className="flex flex-col gap-1">
            {' '}
            <p className="text-center text-sm text-gray-500-600 font-medium">
              Seats vanish fast—secure yours before the list closes
            </p>
            <p className="text-center text-sm opacity-60">
              Limited spots remaining
            </p>
          </div>
        </div>
      </div>
    </form>
  )
}
