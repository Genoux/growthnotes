import { NextRequest, NextResponse } from 'next/server'

interface RSVPData {
  firstName: string
  lastName: string
  email: string
  company: string
  phone: string
  dietaryRestrictions: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body: RSVPData = await request.json()

    if (!body.firstName || !body.lastName || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const n8nWebhookUrl = process.env.N8N_WEBHOOK_NYC_URL
    const n8nAuthToken = process.env.N8N_WEBHOOK_AUTH_TOKEN

    if (!n8nWebhookUrl) {
      console.error('N8N_WEBHOOK_NYC_URL environment variable is not set')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const webhookHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (n8nAuthToken) {
      webhookHeaders['Authorization'] = `Bearer ${n8nAuthToken}`
    }

    const webhookResponse = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: webhookHeaders,
      body: JSON.stringify({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        company: body.company || '',
        phone: body.phone || '',
        dietaryRestrictions: body.dietaryRestrictions || '',
        message: body.message,
        submittedAt: new Date().toLocaleString('en-US'),
      }),
    })

    if (!webhookResponse.ok) {
      console.error('n8n webhook failed:', await webhookResponse.text())
      return NextResponse.json(
        { error: 'Failed to process RSVP' },
        { status: 500 }
      )
    }

    // Handle webhook response - it might be empty or non-JSON
    let result = { success: true }
    try {
      const responseText = await webhookResponse.text()
      if (responseText.trim()) {
        result = JSON.parse(responseText)
      }
    } catch (parseError) {
      console.warn(
        'n8n webhook returned non-JSON response, treating as success'
      )
    }

    return NextResponse.json({
      success: true,
      message: 'RSVP submitted successfully',
      data: result,
    })
  } catch (error) {
    console.error('RSVP API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}