'use client'
import { useState, FormEvent, useRef } from 'react'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { CheckIcon } from 'lucide-react'
import { LoadingCircle } from '@/app/components/LoadingCircle'
import Success from './success'

interface FormData {
  firstName: string
  lastName: string
  email: string
  company: string
  phone: string
  dietaryRestrictions: string
  message: string
}

interface EventFormProps {
  onSuccess: () => void
}

export default function EventForm({ onSuccess }: EventFormProps) {
  const formRef = useRef<HTMLDivElement>(null)
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

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitted) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      setIsSubmitted(true)
      onSuccess()
    } catch (err) {
      console.error('RSVP submission failed:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return <Success />
  }

  return (
    <div ref={formRef} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold-condensed text-start">
          SECURE YOUR SEAT
        </h2>
        <p className="text-sm text-start">
          This invite-only dinner has a seat reserved just for you—but we need
          your confirmation!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium mb-2"
            >
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
            <label
              htmlFor="lastName"
              className="block text-sm font-medium mb-2"
            >
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
              className={`bg-primary text-white rounded-full text-lg font-medium px-12 h-12 min-w-[120px] ${
                isSubmitted ? 'pointer-events-none' : ''
              }`}
            >
              <div
                key={isLoading ? 'loading' : isSubmitted ? 'check' : 'rsvp'}
                className="flex items-center justify-center h-6 w-12"
              >
                {isLoading ? (
                  <LoadingCircle size={24} thickness={2} color="currentColor" />
                ) : isSubmitted ? (
                  <CheckIcon className="h-6 w-6" />
                ) : (
                  <span className="text-lg font-medium">RSVP</span>
                )}
              </div>
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
    </div>
  )
}
