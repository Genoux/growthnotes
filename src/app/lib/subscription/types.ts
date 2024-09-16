export type SubmitSubscriptionResult = {
  success: boolean
  error?: { message: string; code?: string }
  data?: any
}
