'use client'
import { ReactNode } from 'react'
import { QueryProvider } from '@/app/contexts/QueryContext'
import { SubscriptionProvider } from '@/app/contexts/SubscriptionContext'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <SubscriptionProvider>
        {children}
      </SubscriptionProvider>
    </QueryProvider>
  )
}