'use server'

interface SubscriptionError {
  message: string
  code?: string
}

interface SubmitSubscriptionResult {
  success: boolean
  error?: SubscriptionError
  data?: any
}

export async function submitSubscription(
  formData: FormData
): Promise<SubmitSubscriptionResult> {
  const email = formData.get('email') as string
  if (!email) {
    return { success: false, error: { message: 'Email is required' } }
  }

  const publicationId = process.env.PUBLICATION_ID
  const apiToken = process.env.API_TOKEN
  if (!publicationId || !apiToken) {
    console.error('API credentials are not set')
    return { success: false, error: { message: 'Server configuration error' } }
  }

  try {
    const url =
      process.env.NODE_ENV === 'development'
        ? `https://stoplight.io/mocks/beehiiv/v2/104190750/publications/${publicationId}/subscriptions`
        : `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({ email }),
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
