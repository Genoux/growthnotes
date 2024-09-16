'use server'

import { SubmitSubscriptionResult } from './types'

export async function submitSubscription(
  formData: FormData
): Promise<SubmitSubscriptionResult> {
  const email = formData.get('email') as string
  if (!email) {
    return { success: false, error: { message: 'Email is required' } }
  }

  const publicationId = process.env.PUBLICATION_ID
  const apiToken = process.env.API_TOKEN
  const apiUrl = process.env.API_URL
  if (!publicationId || !apiToken || !apiUrl) {
    console.error('API credentials are not set')
    return { success: false, error: { message: 'Server configuration error' } }
  }

  try {
    const url = `${apiUrl}${publicationId}/subscriptions`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({ email, utm_source: 'Website' }),
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(JSON.stringify(data))
    }

    return { success: true, data }
  } catch (error) {
    const parsedError = JSON.parse((error as Error).message)
    const errorMessage = parsedError.errors[0].message || parsedError.message

    return {
      success: false,
      error: {
        message: errorMessage,
      },
    }
  }
}
