'use client'
import React, { createContext, useState, useContext } from 'react'

interface SubscriptionContextType {
  isSubscribed: boolean
  setIsSubscribed: (value: boolean) => void
  isLoading: boolean
  setIsLoading: (value: boolean) => void
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined
)

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <SubscriptionContext.Provider
      value={{ isSubscribed, setIsSubscribed, isLoading, setIsLoading }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}

export const useSubscription = () => {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error(
      'useSubscription must be used within a SubscriptionProvider'
    )
  }
  return context
}
