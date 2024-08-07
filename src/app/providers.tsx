'use client'
import { ReactNode } from 'react'
import { QueryProvider } from '@/app/context/QueryContext'
import { SubscriptionProvider } from '@/app/context/SubscriptionContext'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <SubscriptionProvider>
        {children}
      </SubscriptionProvider>
    </QueryProvider>
  )
}