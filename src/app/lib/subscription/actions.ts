'use server'

interface SubmitSubscriptionResult {
  success: boolean;
  error?: string;
  data?: any;
}

export async function submitSubscription(formData: FormData): Promise<SubmitSubscriptionResult> {
  const email = formData.get('email') as string;

  if (!email) {
    return { success: false, error: 'Email is required' };
  }

  const publicationId = process.env.PUBLICATION_ID;
  const apiToken = process.env.API_TOKEN;

  if (!publicationId || !apiToken) {
    console.error('API credentials are not set');
    return { success: false, error: 'Server configuration error' };
  }

  try {
    let url: string;
    let headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiToken}`,
    };

    if (process.env.NODE_ENV === 'development') {
      console.log('Using Stoplight mock server for API requests');
      url = `https://stoplight.io/mocks/beehiiv/v2/104190750/publications/${publicationId}/subscriptions`;
    } else {
      url = `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error submitting subscription:', data);
      return { success: false, error: data.error || 'Failed to submit subscription' };
    }

    console.log('Subscription submitted successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error submitting subscription:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}